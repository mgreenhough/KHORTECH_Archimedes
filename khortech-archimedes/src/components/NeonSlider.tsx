import { useState, useCallback } from 'react';

interface NeonSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (value: number) => void;
}

export function NeonSlider({ label, value, min, max, step = 1, unit, onChange }: NeonSliderProps) {
  const [localValue, setLocalValue] = useState(value.toFixed(2));

  const handleSliderChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    setLocalValue(newValue.toFixed(2));
    onChange(newValue);
  }, [onChange]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value);
  }, []);

  const commitValue = useCallback(() => {
    let newValue = parseFloat(localValue);
    if (isNaN(newValue)) {
      setLocalValue(value.toFixed(2));
      return;
    }
    setLocalValue(newValue.toFixed(2));
    onChange(newValue);
  }, [localValue, value, onChange]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      commitValue();
      (e.target as HTMLInputElement).blur();
    }
  }, [commitValue]);

  // Clamp for slider display only — actual value can exceed range
  const clampedValue = Math.max(min, Math.min(max, value));
  const percentage = ((clampedValue - min) / (max - min)) * 100;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label className="text-sm text-gray-300 font-medium">{label}</label>
        <div className="flex items-center gap-1">
          <input
            type="number"
            value={localValue}
            onChange={handleInputChange}
            onBlur={commitValue}
            onKeyDown={handleKeyDown}
            className="w-28 px-2 py-1 bg-gray-800 border border-gray-700 rounded text-sm text-right text-white focus:border-neon-blue outline-none transition-colors"
            step={step}
          />
          {unit && <span className="text-xs text-gray-500 w-8">{unit}</span>}
        </div>
      </div>
      <div className="relative w-full">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={clampedValue}
          onChange={handleSliderChange}
          className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-neon-blue slider-thumb"
        />
        <div
          className="absolute top-0 left-0 h-1.5 bg-neon-blue rounded-l-lg pointer-events-none"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}