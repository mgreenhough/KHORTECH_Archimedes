import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface ResultItem {
  label: string;
  value: string | number;
  unit?: string;
  highlight?: 'primary' | 'secondary' | 'warning';
}

interface ResultPanelProps {
  results: ResultItem[];
}

export function ResultPanel({ results }: ResultPanelProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = async (value: string | number, index: number) => {
    await navigator.clipboard.writeText(String(value));
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <div className="bg-gray-900/60 border border-gray-800 rounded-lg !p-0">
      <div className="flex items-center gap-4 px-2 py-0.5 overflow-x-auto">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider shrink-0">Results</h3>
        {results.map((result, index) => (
          <div key={result.label} className="flex items-baseline gap-1 shrink-0">
            <span className="text-sm text-gray-500">{result.label}:</span>
            <span className="text-xl font-mono font-bold text-neon-green">{result.value}</span>
            {result.unit && <span className="text-sm text-gray-500">{result.unit}</span>}
            <button
              onClick={() => handleCopy(result.value, index)}
              className="p-0.5 rounded hover:bg-gray-700 transition-colors"
              title="Copy value"
            >
              {copiedIndex === index ? (
                <Check className="w-3 h-3 text-neon-green" />
              ) : (
                <Copy className="w-3 h-3 text-gray-500" />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}