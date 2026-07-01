import { useRef, type ReactNode } from 'react';
import { Download } from 'lucide-react';

interface VisualizationPanelProps {
  children?: ReactNode;
  canvasRef?: React.RefObject<HTMLCanvasElement | null>;
  onExport?: () => void;
  title?: string;
}

export function VisualizationPanel({ children, canvasRef, onExport, title = 'Visualization' }: VisualizationPanelProps) {
  const internalCanvasRef = useRef<HTMLCanvasElement>(null);
  const targetRef = canvasRef || internalCanvasRef;

  const handleExport = () => {
    if (targetRef.current && onExport) {
      onExport();
    } else if (targetRef.current) {
      const link = document.createElement('a');
      link.download = 'archimedes-visualization.png';
      link.href = targetRef.current.toDataURL('image/png');
      link.click();
    }
  };

  return (
    <div className="card card-front h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">{title}</h3>
        <button
          onClick={handleExport}
          className="p-1.5 rounded hover:bg-gray-800 transition-colors"
          title="Export PNG"
        >
          <Download className="w-4 h-4 text-gray-500" />
        </button>
      </div>
      <div className="flex-1 min-h-0 bg-gray-950 rounded-lg border border-gray-800 overflow-hidden relative">
        {canvasRef ? (
          <canvas
            ref={canvasRef}
            className="w-full h-full"
          />
        ) : (
          children
        )}
      </div>
    </div>
  );
}