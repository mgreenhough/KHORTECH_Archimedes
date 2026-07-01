import { useState } from 'react';
import { ChevronDown, Star, Clock, Wrench, Ruler, Settings, Zap, Droplets, Factory, Thermometer, Cog, Calculator } from 'lucide-react';
import { useAppStore } from '../stores/appStore';

const categories = [
  { id: 'mechanics', name: 'Mechanics', icon: Wrench, calculators: ['Bell Crank & Lever MA', 'Crank Efficiency', 'Moment & Torque', 'Friction', 'Pulley', 'Truss', 'Centroid', 'Projectile'] },
  { id: 'materials', name: 'Materials & Stress', icon: Ruler, calculators: ['Beam Deflection', 'Stress Concentration', 'Buckling', 'Torsion', "Mohr's Circle", 'Fatigue'] },
  { id: 'power', name: 'Power Transmission', icon: Zap, calculators: ['Spur Gear', 'Gear Train', 'Belt Drive', 'Chain Drive', 'Shaft Design'] },
  { id: 'fasteners', name: 'Fasteners', icon: Settings, calculators: ['Bolt Torque', 'Thread Data', 'Bolt Group', 'Rivet Joint'] },
  { id: 'fluid', name: 'Fluid Power', icon: Droplets, calculators: ['Hydraulic Cylinder', 'Pneumatic Flow', 'Pipe Pressure Drop'] },
  { id: 'springs', name: 'Springs', icon: Cog, calculators: ['Compression', 'Extension', 'Torsion', 'Leaf'] },
  { id: 'bearings', name: 'Bearings', icon: Cog, calculators: ['L10 Life', 'Journal Bearing'] },
  { id: 'thermal', name: 'Thermal', icon: Thermometer, calculators: ['Heat Exchanger', 'Thermal Expansion'] },
  { id: 'manufacturing', name: 'Manufacturing', icon: Factory, calculators: ['Cutting Speed', 'Tap Drill', 'Tolerances'] },
  { id: 'utilities', name: 'Utilities', icon: Calculator, calculators: ['Unit Converter', 'Scientific Calculator', 'Material DB'] },
];

export function Sidebar() {
  const { sidebarCollapsed, favorites, recent, activeCalculator, setActiveCalculator } = useAppStore();
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['mechanics']);

  const toggleCategory = (id: string) => {
    setExpandedCategories(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  if (sidebarCollapsed) {
    return (
      <aside className="w-14 bg-gray-900 border-r border-gray-800 flex flex-col items-center py-4 shrink-0">
        <div className="w-8 h-8 rounded bg-neon-blue/20 flex items-center justify-center">
          <Settings className="w-4 h-4 text-neon-blue" />
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col shrink-0 overflow-hidden">
      <div className="p-3 border-b border-gray-800">
        <div className="flex items-center gap-2 text-xs text-gray-500 uppercase tracking-wider font-semibold mb-2">
          <Star className="w-3 h-3" />
          Favorites
        </div>
        {favorites.length === 0 ? (
          <p className="text-xs text-gray-600 italic">No favorites yet</p>
        ) : (
          <div className="space-y-1">
            {favorites.map(id => (
              <button
                key={id}
                onClick={() => setActiveCalculator(id)}
                className={`w-full text-left px-2 py-1.5 rounded text-sm ${activeCalculator === id ? 'bg-neon-blue/20 text-neon-blue border-l-2 border-neon-blue' : 'text-gray-400 hover:bg-gray-800'}`}
              >
                {id}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="p-3 border-b border-gray-800">
        <div className="flex items-center gap-2 text-xs text-gray-500 uppercase tracking-wider font-semibold mb-2">
          <Clock className="w-3 h-3" />
          Recent
        </div>
        {recent.length === 0 ? (
          <p className="text-xs text-gray-600 italic">No recent calculators</p>
        ) : (
          <div className="space-y-1">
            {recent.map(id => (
              <button
                key={id}
                onClick={() => setActiveCalculator(id)}
                className={`w-full text-left px-2 py-1.5 rounded text-sm ${activeCalculator === id ? 'bg-neon-blue/20 text-neon-blue border-l-2 border-neon-blue' : 'text-gray-400 hover:bg-gray-800'}`}
              >
                {id}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-2">Categories</div>
        {categories.map(category => {
          const Icon = category.icon;
          const isExpanded = expandedCategories.includes(category.id);
          return (
            <div key={category.id} className="mb-1">
              <button
                onClick={() => toggleCategory(category.id)}
                className="w-full flex items-center gap-2 px-2 py-2 rounded hover:bg-gray-800 transition-colors text-sm text-gray-300"
              >
                <Icon className="w-4 h-4" />
                <span className="flex-1 text-left">{category.name}</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
              </button>
              {isExpanded && (
                <div className="ml-6 mt-1 space-y-1">
                  {category.calculators.map(calc => (
                    <button
                      key={calc}
                      onClick={() => setActiveCalculator(calc)}
                      className={`w-full text-left px-2 py-1.5 rounded text-sm ${activeCalculator === calc ? 'bg-neon-blue/20 text-neon-blue border-l-2 border-neon-blue' : 'text-gray-400 hover:bg-gray-800'}`}
                    >
                      {calc}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}