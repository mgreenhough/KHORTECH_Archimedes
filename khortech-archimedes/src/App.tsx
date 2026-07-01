import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { BellCrankCalculator } from './components/calculators/BellCrank';
import { CrankEfficiencyCalculator } from './components/calculators/CrankEfficiency';
import { useAppStore } from './stores/appStore';

function WelcomeScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <h2 className="neon-title text-4xl font-bold mb-4">Welcome to Archimedes</h2>
      <p className="text-gray-400 text-lg mb-8 max-w-md">
        Interactive mechanical engineering calculators with real-time visualizations.
        Select a calculator from the sidebar to get started.
      </p>
      <div className="grid grid-cols-2 gap-4 max-w-sm">
        <div className="card card-front text-center p-6">
          <div className="text-3xl font-bold text-neon-blue mb-1">40+</div>
          <div className="text-sm text-gray-500">Calculators</div>
        </div>
        <div className="card card-front text-center p-6">
          <div className="text-3xl font-bold text-neon-green mb-1">Canvas</div>
          <div className="text-sm text-gray-500">Real-time Viz</div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const { activeCalculator } = useAppStore();

  return (
    <div className="flex flex-col h-screen bg-gray-950 text-white overflow-hidden">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-hidden">
          {activeCalculator === 'Bell Crank & Lever MA' ? (
            <BellCrankCalculator />
          ) : activeCalculator === 'Crank Efficiency' ? (
            <CrankEfficiencyCalculator />
          ) : (
            <WelcomeScreen />
          )}
        </main>
      </div>
    </div>
  );
}