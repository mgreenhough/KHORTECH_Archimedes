import { useAppStore } from '../stores/appStore';
import { Ruler } from 'lucide-react';

export function UnitSelector() {
  const { unitSystem, setUnitSystem } = useAppStore();

  return (
    <button
      onClick={() => setUnitSystem(unitSystem === 'metric' ? 'imperial' : 'metric')}
      className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-300 hover:bg-gray-700 transition-colors"
      title={`Switch to ${unitSystem === 'metric' ? 'imperial' : 'metric'}`}
    >
      <Ruler className="w-3.5 h-3.5" />
      <span className="uppercase font-medium">{unitSystem}</span>
    </button>
  );
}