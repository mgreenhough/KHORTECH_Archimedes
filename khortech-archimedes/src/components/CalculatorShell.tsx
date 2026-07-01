import type { ReactNode } from 'react';
import { Breadcrumb } from './Breadcrumb';
import { HelpCircle } from 'lucide-react';

interface CalculatorShellProps {
  title: string;
  category: string;
  description?: string;
  children: ReactNode;
}

export function CalculatorShell({ title, category, description, children }: CalculatorShellProps) {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800 bg-gray-900/50">
        <Breadcrumb category={category} calculator={title} />
        <button className="p-1.5 rounded-lg hover:bg-gray-800 transition-colors" aria-label="Help">
          <HelpCircle className="w-4 h-4 text-gray-400" />
        </button>
      </div>
      {description && (
        <p className="px-4 py-2 text-sm text-gray-500 border-b border-gray-800">{description}</p>
      )}
      <div className="flex-1 overflow-auto p-4">
        {children}
      </div>
    </div>
  );
}