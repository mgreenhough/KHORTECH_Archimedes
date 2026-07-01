import { useRef, useEffect, useState, useMemo } from 'react';
import { CalculatorShell } from '../CalculatorShell';
import { VisualizationPanel } from '../VisualizationPanel';
import { NeonSlider } from '../NeonSlider';
import { ResultPanel } from '../ResultPanel';
import { FormulaReference } from '../FormulaReference';
import { clearCanvas, drawGrid, drawLine, drawCircle, drawArrow, drawText } from '../../lib/canvasRenderer';
import type { CanvasPoint } from '../../lib/canvasRenderer';
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Area,
  ComposedChart,
} from 'recharts';

function toRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

function pt(x: number, y: number): CanvasPoint {
  return { x, y };
}

function efficiencyFromTransmissionAngle(deg: number): number {
  return Math.sin(toRad(deg));
}

function efficiencyAtCrankAngle(crankDeg: number, forceDeg: number): number {
  let transmission = crankDeg - forceDeg;
  transmission = Math.abs(transmission) % 360;
  if (transmission > 180) transmission = 360 - transmission;
  return Math.max(0, efficiencyFromTransmissionAngle(transmission));
}

const REF_TABLE = (() => {
  const rows: { dev: number; eff: number }[] = [];
  for (let d = 0; d <= 90; d += 5) {
    rows.push({ dev: d, eff: Math.cos(toRad(d)) });
  }
  return rows;
})();

export function CrankEfficiencyCalculator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [crankAngle, setCrankAngle] = useState(45);
  const [transmissionAngle, setTransmissionAngle] = useState(90);
  const [crankRadiusM, setCrankRadiusM] = useState(0.1);

  const [desiredTravelMm, setDesiredTravelMm] = useState(100);
  const [minEfficiency, setMinEfficiency] = useState(0.7);

  const absoluteForceAngle = crankAngle + transmissionAngle;
  const currentEfficiency = efficiencyFromTransmissionAngle(transmissionAngle);

  const peakA = ((absoluteForceAngle + 90) % 360 + 360) % 360;
  const peakB = ((absoluteForceAngle - 90) % 360 + 360) % 360;

  const design = useMemo(() => {
    if (minEfficiency <= 0 || minEfficiency >= 1) return null;
    const thetaMin = Math.asin(minEfficiency) * (180 / Math.PI);
    const halfWindow = 90 - thetaMin;
    const angularWindow = 2 * halfWindow;
    const halfWindowRad = toRad(halfWindow);
    const sinHalf = Math.sin(halfWindowRad);
    const R_mm = sinHalf > 1e-9 ? desiredTravelMm / (2 * sinHalf) : Infinity;
    const arcLength_mm = R_mm * toRad(angularWindow);

    const distA = Math.abs(((crankAngle - peakA + 180) % 360 + 360) % 360 - 180);
    const distB = Math.abs(((crankAngle - peakB + 180) % 360 + 360) % 360 - 180);
    const centerPeak = distA <= distB ? peakA : peakB;

    return {
      halfWindow,
      angularWindow,
      R_mm,
      arcLength_mm,
      centerPeak,
      startAngle: centerPeak - halfWindow,
      endAngle: centerPeak + halfWindow,
    };
  }, [minEfficiency, desiredTravelMm, peakA, peakB, crankAngle]);

  const chartData = useMemo(() => {
    const data: { angle: number; efficiency: number }[] = [];
    for (let a = -180; a <= 180; a += 2) {
      const eff = efficiencyAtCrankAngle(a, absoluteForceAngle);
      data.push({ angle: a, efficiency: Number((eff * 100).toFixed(2)) });
    }
    return data;
  }, [absoluteForceAngle]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    clearCanvas(ctx, rect.width, rect.height);
    drawGrid(ctx, rect.width, rect.height, 40, 'rgba(255,255,255,0.03)');

    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const maxR = Math.min(rect.width, rect.height) * 0.35;
    const R_px = Math.min(crankRadiusM * 1000, maxR);

    const crankRad = toRad(-crankAngle);
    const pinX = cx + R_px * Math.cos(crankRad);
    const pinY = cy + R_px * Math.sin(crankRad);

    const forceRad = toRad(-absoluteForceAngle);
    const arrowLen = R_px * 0.35;
    const forceEndX = pinX + arrowLen * Math.cos(forceRad);
    const forceEndY = pinY + arrowLen * Math.sin(forceRad);

    drawLine(ctx, { start: pt(cx, cy), end: pt(pinX, pinY), color: '#ff4444', width: 3 });
    drawCircle(ctx, pt(cx, cy), 6, { fill: '#fff' });
    drawCircle(ctx, pt(pinX, pinY), 4, { fill: '#ff4444' });

    drawArrow(ctx, { start: pt(forceEndX, forceEndY), end: pt(pinX, pinY), color: '#39ff14', width: 2, headLength: 8 });

    const perpAngle = crankRad - Math.PI / 2;
    const perpLen = arrowLen * currentEfficiency;
    drawLine(ctx, { start: pt(pinX, pinY), end: pt(pinX + perpLen * Math.cos(perpAngle), pinY + perpLen * Math.sin(perpAngle)), color: '#00f3ff', width: 2 });

    const inlineLen = arrowLen * Math.abs(Math.cos(toRad(transmissionAngle)));
    ctx.setLineDash([4, 4]);
    drawLine(ctx, { start: pt(pinX, pinY), end: pt(pinX + inlineLen * Math.cos(crankRad), pinY + inlineLen * Math.sin(crankRad)), color: 'rgba(255,255,255,0.2)', width: 1 });
    ctx.setLineDash([]);

    const arcRadius = 30;
    ctx.beginPath();
    ctx.arc(pinX, pinY, arcRadius, toRad(Math.min(-crankAngle, -absoluteForceAngle)), toRad(Math.max(-crankAngle, -absoluteForceAngle)));
    ctx.strokeStyle = '#00f3ff';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    drawText(ctx, 'Pivot', pt(cx + 10, cy - 10), { color: '#9ca3af', font: '11px Roboto Mono' });
    drawText(ctx, `Crank: ${crankAngle.toFixed(0)}°`, pt(pinX + 8, pinY - 8), { color: '#ff4444', font: '11px Roboto Mono' });
    drawText(ctx, `Force: ${absoluteForceAngle.toFixed(0)}° abs`, pt(forceEndX + 5, forceEndY - 5), { color: '#39ff14', font: '11px Roboto Mono' });
    drawText(ctx, `η = ${(currentEfficiency * 100).toFixed(1)}%`, pt(cx - 40, cy + 25), { color: '#00f3ff', font: 'bold 13px Roboto Mono' });
  }, [crankAngle, transmissionAngle, absoluteForceAngle, crankRadiusM, currentEfficiency]);

  return (
    <CalculatorShell title="Crank Efficiency vs Angle" category="Mechanics" description="Normalized torque transmission efficiency for a crank with fixed-direction force source. Find the optimal angular window and size your crank for desired travel.">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 h-full">
        <div className="flex flex-col gap-3 h-full min-h-0">
          <div className="flex-1 min-h-[220px]">
            <VisualizationPanel canvasRef={canvasRef} title="Crank & Force Diagram" />
          </div>
          <div className="card card-front p-3 min-h-[220px] flex flex-col">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Efficiency Curve</h3>
            <div className="flex-1 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="angle" tick={{ fill: '#9ca3af', fontSize: 11, fontFamily: 'Roboto Mono' }} tickCount={9} label={{ value: 'Crank Angle (°)', position: 'insideBottom', offset: -2, fill: '#6b7280', fontSize: 11 }} />
                  <YAxis tick={{ fill: '#9ca3af', fontSize: 11, fontFamily: 'Roboto Mono' }} domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                  <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '6px', fontFamily: 'Roboto Mono', fontSize: '12px' }} formatter={(value) => [`${Number(value).toFixed(1)}%`, 'Efficiency']} labelFormatter={(label) => `Crank: ${label}°`} />
                  <Area type="monotone" dataKey="efficiency" fill="rgba(0,243,255,0.08)" stroke="none" />
                  <Line type="monotone" dataKey="efficiency" stroke="#00f3ff" strokeWidth={2} dot={false} activeDot={{ r: 4, fill: '#00f3ff' }} />
                  <ReferenceLine x={Math.round(crankAngle)} stroke="#ff4444" strokeDasharray="4 4" strokeWidth={1.5} label={{ value: `${Math.round(crankAngle)}°`, position: 'top', fill: '#ff4444', fontSize: 11 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 overflow-auto">
          <div className="card card-front">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Crank Parameters</h3>
            <div className="space-y-4">
              <NeonSlider label="Crank Angle" value={crankAngle} min={-180} max={180} step={1} unit="°" onChange={setCrankAngle} />
              <NeonSlider label="Transmission Angle (force rel. to crank)" value={transmissionAngle} min={0} max={180} step={1} unit="°" onChange={setTransmissionAngle} />
              <NeonSlider label="Crank Radius (draw scale)" value={crankRadiusM} min={0.02} max={0.5} step={0.01} unit="m" onChange={setCrankRadiusM} />
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="bg-gray-800/50 rounded p-2"><span className="text-gray-500">Efficiency</span><div className="text-white text-lg">{(currentEfficiency * 100).toFixed(1)}%</div></div>
              <div className="bg-gray-800/50 rounded p-2"><span className="text-gray-500">Peaks @ Crank</span><div className="text-neon-blue text-[11px]">{peakA.toFixed(0)}° / {peakB.toFixed(0)}°</div></div>
            </div>
          </div>

          <ResultPanel results={[
            { label: 'Efficiency', value: `${(currentEfficiency * 100).toFixed(1)}`, unit: '%', highlight: currentEfficiency > 0.9 ? 'primary' : currentEfficiency > 0.5 ? 'secondary' : 'warning' },
            { label: 'Loss from ideal', value: `${((1 - currentEfficiency) * 100).toFixed(1)}`, unit: '%' },
          ]} />

          <div className="card card-front">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Deviation from 90° vs Efficiency</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs font-mono">
                <thead><tr className="text-gray-500 border-b border-gray-700"><th className="text-left py-1 pr-3">± from 90°</th><th className="text-left py-1 pr-3">Trans. Angle</th><th className="text-right py-1">Efficiency</th></tr></thead>
                <tbody>
                  {REF_TABLE.filter((_, i) => i % 2 === 0).map((row) => {
                    const transAngle = 90 + row.dev;
                    const isHighlighted = Math.abs(transmissionAngle - transAngle) < 3 || Math.abs(transmissionAngle - (90 - row.dev)) < 3;
                    return (
                      <tr key={row.dev} className={`border-b border-gray-800/50 ${isHighlighted ? 'bg-neon-blue/10' : ''}`}>
                        <td className="py-1 pr-3 text-gray-300">±{row.dev}°</td>
                        <td className="py-1 pr-3 text-gray-400">{90 - row.dev}° / {90 + row.dev}°</td>
                        <td className="py-1 text-right text-neon-green">{(row.eff * 100).toFixed(1)}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="text-[10px] text-gray-500 mt-2 leading-relaxed">Transmission angle is the angle between the crank arm and the force vector. Efficiency peaks at 90° (perpendicular) and drops as sin(θ).</p>
          </div>

          <div className="card card-front">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Design Helper — Sizing for Travel</h3>
            <div className="space-y-4">
              <NeonSlider label="Desired Travel (chord)" value={desiredTravelMm} min={10} max={500} step={5} unit="mm" onChange={setDesiredTravelMm} />
              <NeonSlider label="Min Acceptable Efficiency" value={minEfficiency} min={0.1} max={0.99} step={0.01} unit="frac" onChange={setMinEfficiency} />
            </div>
            {design && (
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="bg-gray-800/50 rounded p-2"><span className="text-gray-500">Usable Window</span><div className="text-neon-blue text-lg">{design.angularWindow.toFixed(1)}°</div><div className="text-gray-500 text-[10px]">{design.startAngle.toFixed(0)}° → {design.endAngle.toFixed(0)}°</div></div>
                <div className="bg-gray-800/50 rounded p-2"><span className="text-gray-500">Crank Radius</span><div className="text-neon-green text-lg">{design.R_mm < 10000 ? `${design.R_mm.toFixed(1)} mm` : '—'}</div><div className="text-gray-500 text-[10px]">Arc: {design.arcLength_mm.toFixed(0)} mm</div></div>
              </div>
            )}
            <p className="text-[10px] text-gray-500 mt-2 leading-relaxed">Computes crank radius required to achieve the desired linear travel (chord length) while staying within an angular window where efficiency never drops below the threshold. Centered on the nearest peak ({design ? design.centerPeak.toFixed(0) : '—'}° for current setup).</p>
          </div>

          <FormulaReference content={`η = sin(θ) × 100%   where θ = angle between crank arm and force vector
Peak efficiency = 100% @ θ = 90° (force perpendicular to crank)
Efficiency loss = (1 − sin(θ)) × 100%

Usable angular window for min efficiency ηₘᵢₙ:
Δθ = 180° − 2·arcsin(ηₘᵢₙ)
Crank radius for chord travel S:  R = S / (2·sin(Δθ/2))`} />
        </div>
      </div>
    </CalculatorShell>
  );
}