import { ChevronDown, BookOpen } from 'lucide-react';
import { useState } from 'react';

interface FormulaReferenceProps {
  content: string;
}

export function FormulaReference({ content }: FormulaReferenceProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="card card-front">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-neon-blue" />
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
            Formula Reference
          </h3>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="mt-3 p-3 bg-gray-950 rounded-lg border border-gray-700">
          <div className="prose prose-invert prose-sm max-w-none">
            {content.split('\n').map((line, i) => (
              <p key={i} className="text-sm text-gray-300 font-mono mb-1">
                {line}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}