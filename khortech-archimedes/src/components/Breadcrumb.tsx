import { ChevronRight } from 'lucide-react';

interface BreadcrumbProps {
  category: string;
  calculator: string;
}

export function Breadcrumb({ category, calculator }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-1.5 text-sm">
      <span className="text-gray-400">{category}</span>
      <ChevronRight className="w-3 h-3 text-gray-600" />
      <span className="text-neon-blue font-medium">{calculator}</span>
    </nav>
  );
}