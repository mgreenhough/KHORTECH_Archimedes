import numpy as np
import matplotlib.pyplot as plt
from matplotlib.widgets import Slider, TextBox

# -----------------------
# HELPERS
# -----------------------
def vec(angle_deg, length):
    a = np.radians(angle_deg)
    return np.array([np.cos(a), np.sin(a)]) * length

def torque(r, F, arm_angle, force_angle):
    return r * F * np.sin(np.radians(force_angle - arm_angle))

# -----------------------
# INITIALS
# -----------------------
r_in0 = 1.0
r_out0 = 0.7

a_in0 = 30
a_out0 = 120

F_in0 = 50
F_out0 = 50

fin_dir0 = 80
fout_dir0 = -20

# Scale factors for slider ranges (multiples of initial values)
LENGTH_SCALE = 2.5
FORCE_SCALE = 2.0

# Which force slider is currently driving the equilibrium
_driver = 'fin'

# -----------------------
# FIGURE
# -----------------------
fig, ax = plt.subplots()
plt.subplots_adjust(left=0.48, bottom=0.35)

ax.set_aspect('equal')
ax.grid(True)
ax.set_autoscale_on(False)

# geometry
line_in, = ax.plot([], [], 'ro-', lw=3)
line_out, = ax.plot([], [], 'bo-', lw=3)

# forces
fin_line, = ax.plot([], [], 'r-', lw=2)
fout_line, = ax.plot([], [], 'b-', lw=2)

pivot, = ax.plot(0, 0, 'ko')

info = fig.text(0.02, 0.95, "", va='top', family='monospace')

# -----------------------
# SLIDERS & TEXT BOXES
# -----------------------
slider_specs = [
    ('r_in',     0.30, 'Input Radius (m)',          0.1, LENGTH_SCALE * r_in0,  r_in0,     '{:.2f}'),
    ('r_out',    0.26, 'Output Radius (m)',         0.1, LENGTH_SCALE * r_out0, r_out0,    '{:.2f}'),
    ('a_in',     0.22, 'Input Angle (deg)',        -180, 180,                   a_in0,     '{:.1f}'),
    ('a_out',    0.18, 'Output Angle (deg)',       -180, 180,                   a_out0,    '{:.1f}'),
    ('fin_dir',  0.14, 'Input Force Direction (deg)',    -180, 180,                   fin_dir0,  '{:.1f}'),
    ('fout_dir', 0.10, 'Output Force Direction (deg)',   -180, 180,                   fout_dir0, '{:.1f}'),
    ('fin',      0.06, 'Input Force (N)',           0.0, FORCE_SCALE * F_in0,   F_in0,     '{:.1f}'),
    ('fout',     0.02, 'Output Force (N)',          0.0, FORCE_SCALE * F_out0,  F_out0,    '{:.1f}'),
]

sliders = {}
textboxes = {}
_updating = False      # guards textbox <-> slider sync loops
_programmatic = False  # guards solver-driven slider updates

for spec in slider_specs:
    key, y, label, vmin, vmax, init, fmt = spec
    
    fig.text(0.005, y + 0.015, label, ha='left', va='center', fontsize=6)
    
    ax_slider = plt.axes([0.28, y, 0.13, 0.03])
    slider = Slider(ax_slider, '', vmin, vmax, valinit=init)
    slider.valtext.set_visible(False)
    sliders[key] = slider
    
    ax_text = plt.axes([0.42, y, 0.06, 0.03])
    textbox = TextBox(ax_text, '', initial=fmt.format(init), textalignment='center')
    textboxes[key] = textbox
    
    # TextBox -> Slider
    def make_tb_callback(slider_obj):
        def callback(text):
            global _updating
            if _updating:
                return
            try:
                val = float(text)
                if slider_obj.valmin <= val <= slider_obj.valmax:
                    _updating = True
                    slider_obj.set_val(val)
                    _updating = False
            except ValueError:
                pass
        return callback
    textbox.on_submit(make_tb_callback(slider))
    
    # Slider -> TextBox
    def make_sl_callback(textbox_obj, format_str):
        def callback(val):
            global _updating
            if _updating:
                return
            _updating = True
            textbox_obj.set_val(format_str.format(val))
            _updating = False
        return callback
    slider.on_changed(make_sl_callback(textbox, fmt))

# User-initiated change -> solve & update
def on_user_change(key):
    def callback(val):
        global _driver, _programmatic
        if _programmatic:
            return
        if key in ('fin', 'fout'):
            _driver = key
        solve_and_update()
    return callback

for spec in slider_specs:
    sliders[spec[0]].on_changed(on_user_change(spec[0]))

# -----------------------
# SOLVE & DISPLAY
# -----------------------
def solve_and_update():
    global _programmatic
    
    r_in  = sliders['r_in'].val
    r_out = sliders['r_out'].val
    a_in  = sliders['a_in'].val
    a_out = sliders['a_out'].val
    fin_dir  = sliders['fin_dir'].val
    fout_dir = sliders['fout_dir'].val
    
    F_in  = sliders['fin'].val
    F_out = sliders['fout'].val
    
    if _driver == 'fin':
        Tin = torque(r_in, F_in, a_in, fin_dir)
        sin_out = np.sin(np.radians(fout_dir - a_out))
        if abs(sin_out) < 1e-6:
            F_out_new = 0
        else:
            F_out_new = Tin / (r_out * sin_out)
        if abs(F_out_new - F_out) > 1e-6:
            _programmatic = True
            sliders['fout'].set_val(F_out_new)
            _programmatic = False
    else:  # _driver == 'fout'
        Tout = torque(r_out, F_out, a_out, fout_dir)
        sin_in = np.sin(np.radians(fin_dir - a_in))
        if abs(sin_in) < 1e-6:
            F_in_new = 0
        else:
            F_in_new = Tout / (r_in * sin_in)
        if abs(F_in_new - F_in) > 1e-6:
            _programmatic = True
            sliders['fin'].set_val(F_in_new)
            _programmatic = False
    
    update_display()

def update_display():
    r_in  = sliders['r_in'].val
    r_out = sliders['r_out'].val
    a_in  = sliders['a_in'].val
    a_out = sliders['a_out'].val
    fin_dir  = sliders['fin_dir'].val
    fout_dir = sliders['fout_dir'].val
    F_in  = sliders['fin'].val
    F_out = sliders['fout'].val
    
    in_end  = vec(a_in, r_in)
    out_end = vec(a_out, r_out)
    
    fin_vec = vec(fin_dir, 0.4)
    fout_vec = vec(fout_dir, 0.4)
    
    fin_start = in_end
    fout_start = out_end
    fin_end = fin_start + fin_vec
    fout_end = fout_start + fout_vec
    
    # draw arms
    line_in.set_data([0, in_end[0]], [0, in_end[1]])
    line_out.set_data([0, out_end[0]], [0, out_end[1]])
    
    # draw forces
    fin_line.set_data([fin_start[0], fin_end[0]], [fin_start[1], fin_end[1]])
    fout_line.set_data([fout_start[0], fout_end[0]], [fout_start[1], fout_end[1]])
    
    # autoscale geometry
    xs = [0, in_end[0], out_end[0]]
    ys = [0, in_end[1], out_end[1]]
    pad = 0.3
    ax.set_xlim(min(xs)-pad, max(xs)+pad)
    ax.set_ylim(min(ys)-pad, max(ys)+pad)
    
    driver_name = 'Input Force' if _driver == 'fin' else 'Output Force'
    info.set_text(
f"""Driver: {driver_name}

Input Force  = {F_in:.2f} N
Output Force = {F_out:.2f} N
"""
    )
    
    fig.canvas.draw_idle()

# Initial solve to establish equilibrium
solve_and_update()
plt.show()