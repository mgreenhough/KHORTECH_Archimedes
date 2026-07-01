import { Menu, Search, Settings } from 'lucide-react';
import { useAppStore } from '../stores/appStore';

export function Header() {
  const { toggleSidebar, setSearchOpen } = useAppStore();

  return (
    <header className="h-14 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-4 shrink-0">
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
          aria-label="Toggle sidebar"
        >
          <Menu className="w-5 h-5 text-gray-300" />
        </button>
        <h1 className="neon-title text-lg font-bold tracking-wider">
          KHORTECH ARCHIMEDES
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setSearchOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-400 hover:bg-gray-700 transition-colors"
        >
          <Search className="w-4 h-4" />
          <span className="hidden sm:inline">Search calculators...</span>
          <kbd className="hidden sm:inline px-1.5 py-0.5 bg-gray-700 rounded text-xs">
            Ctrl+K
          </kbd>
        </button>

        <button
          className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
          aria-label="Settings"
        >
          <Settings className="w-5 h-5 text-gray-300" />
        </button>
      </div>
    </header>
  );
}