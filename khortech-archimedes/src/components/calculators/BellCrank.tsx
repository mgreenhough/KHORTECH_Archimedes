import { useState, useRef, useEffect } from 'react';
import { CalculatorShell } from '../CalculatorShell';
import { VisualizationPanel } from '../VisualizationPanel';
import { NeonSlider } from '../NeonSlider';
import { ResultPanel } from '../ResultPanel';
import { FormulaReference } from '../FormulaReference';
import { UnitSelector } from '../UnitSelector';
import { clearCanvas, drawGrid, drawLine, drawCircle, drawArrow } from '../../lib/canvasRenderer';
import type { CanvasPoint } from '../../lib/canvasRenderer';

export function BellCrankCalculator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rIn, setRIn] = useState(100.0);
  const [rOut, setROut] = useState(70.0);

  function getRadiusSliderRange(value: number): { min: number; max: number } {
    const halfRange = Math.max(value * 0.375, 2.0);
    return {
      min: Math.max(0.1, value - halfRange),
      max: Math.min(1000, value + halfRange),
    };
  }

  const rInRange = getRadiusSliderRange(rIn);
  const rOutRange = getRadiusSliderRange(rOut);
  const [aIn, setAIn] = useState(30);
  const [aOut, setAOut] = useState(120);
  const [fIn, setFIn] = useState(50);
  const [fInAngle, setFInAngle] = useState(80);
  const [fOutAngle, setFOutAngle] = useState(-20);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    clearCanvas(ctx, rect.width, rect.height);
    drawGrid(ctx, rect.width, rect.height, 40, 'rgba(255, 255, 255, 0.03)');

    const rInM = rIn / 100;
    const rOutM = rOut / 100;
    const arrowLenIn = rInM * 0.3;
    const arrowLenOut = rOutM * 0.3;

    const allPoints: CanvasPoint[] = [
      { x: 0, y: 0 },
      { x: rInM * Math.sin((aIn * Math.PI) / 180), y: -rInM * Math.cos((aIn * Math.PI) / 180) },
      { x: rOutM * Math.sin((aOut * Math.PI) / 180), y: -rOutM * Math.cos((aOut * Math.PI) / 180) },
      { x: rInM * Math.sin((aIn * Math.PI) / 180) + arrowLenIn * Math.sin((fInAngle * Math.PI) / 180),
        y: -rInM * Math.cos((aIn * Math.PI) / 180) - arrowLenIn * Math.cos((fInAngle * Math.PI) / 180) },
      { x: rOutM * Math.sin((aOut * Math.PI) / 180) + arrowLenOut * Math.sin((fOutAngle * Math.PI) / 180),
        y: -rOutM * Math.cos((aOut * Math.PI) / 180) - arrowLenOut * Math.cos((fOutAngle * Math.PI) / 180) },
    ];

    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    for (const p of allPoints) {
      minX = Math.min(minX, p.x);
      maxX = Math.max(maxX, p.x);
      minY = Math.min(minY, p.y);
      maxY = Math.max(maxY, p.y);
    }

    const padding = 40;
    const availW = rect.width - padding * 2;
    const availH = rect.height - padding * 2;
    const worldW = maxX - minX || 1;
    const worldH = maxY - minY || 1;
    const scale = Math.min(availW / worldW, availH / worldH);

    const offsetX = padding + (availW - worldW * scale) / 2 - minX * scale;
    const offsetY = padding + (availH - worldH * scale) / 2 - minY * scale;

    const toScreen = (p: CanvasPoint): CanvasPoint => ({
      x: offsetX + p.x * scale,
      y: offsetY + p.y * scale,
    });

    const pivotS = toScreen({ x: 0, y: 0 });
    const inEndS = toScreen(allPoints[1]);
    const outEndS = toScreen(allPoints[2]);
    const fInTailS = toScreen(allPoints[3]);
    const fOutEndS = toScreen(allPoints[4]);

    drawLine(ctx, { start: pivotS, end: inEndS, color: '#ff4444', width: 3 });
    drawLine(ctx, { start: pivotS, end: outEndS, color: '#4488ff', width: 3 });
    drawCircle(ctx, pivotS, 6, { fill: '#fff' });
    drawArrow(ctx, { start: fInTailS, end: inEndS, color: '#39ff14', width: 2 });
    drawArrow(ctx, { start: outEndS, end: fOutEndS, color: '#39ff14', width: 2 });
  }, [rIn, rOut, aIn, aOut, fIn, fInAngle, fOutAngle]);

  const sinIn = Math.sin(((fInAngle - aIn) * Math.PI) / 180);
  const sinOut = Math.sin(((fOutAngle - aOut) * Math.PI) / 180);
  const rInM = rIn / 100;
  const rOutM = rOut / 100;
  const torqueIn = rInM * fIn * sinIn;
  const fOut = Math.abs(sinOut) > 1e-6 ? -torqueIn / (rOutM * sinOut) : 0;
  void (rOutM * fOut * sinOut);
  const ma = Math.abs(fIn) > 1e-6 ? Math.abs(fOut / fIn) : 0;

  return (
    <CalculatorShell
      title="Bell Crank & Lever Mechanical Advantage"
      category="Mechanics"
      description="Interactive bell crank and lever mechanical advantage calculator with real-time visualization"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
        <div className="flex flex-col gap-3 h-full">
          <div className="flex-1 min-h-0">
            <VisualizationPanel canvasRef={canvasRef} title="Force Diagram" />
          </div>
          <ResultPanel
            results={[
              { label: 'Output Force (solved)', value: fOut.toFixed(2), unit: 'N' },
              { label: 'Torque', value: torqueIn.toFixed(2), unit: 'N·m' },
              { label: 'Mechanical Advantage', value: ma.toFixed(3), highlight: 'primary' },
            ]}
          />
        </div>

        <div className="flex flex-col gap-3 overflow-auto">
          <div className="card card-front">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Angle Reference</h3>
            <div className="flex items-center gap-4">
              <svg width="80" height="80" viewBox="0 0 80 80" className="shrink-0">
                <circle cx="40" cy="40" r="30" fill="none" stroke="#374151" strokeWidth="1" strokeDasharray="2 2" />
                <line x1="40" y1="40" x2="40" y2="10" stroke="#00f3ff" strokeWidth="2" />
                <text x="36" y="8" fill="#00f3ff" fontSize="8" fontFamily="Roboto Mono">0°</text>
                <text x="72" y="42" fill="#9ca3af" fontSize="8" fontFamily="Roboto Mono">90°</text>
                <text x="34" y="78" fill="#9ca3af" fontSize="8" fontFamily="Roboto Mono">180°</text>
                <text x="4" y="42" fill="#9ca3af" fontSize="8" fontFamily="Roboto Mono">270°</text>
                <path d="M 55 18 A 25 25 0 0 1 65 40" fill="none" stroke="#00f3ff" strokeWidth="1.5" strokeLinecap="round" markerEnd="url(#arrowhead)" />
                <defs>
                  <marker id="arrowhead" markerWidth="6" markerHeight="4" refX="6" refY="2" orient="auto">
                    <polygon points="0 0, 6 2, 0 4" fill="#00f3ff" />
                  </marker>
                </defs>
              </svg>
              <p className="text-xs text-gray-400 leading-relaxed">
                All angles are <strong className="text-gray-300">absolute</strong>.<br />
                <strong className="text-neon-blue">0°</strong> = Top Dead Centre (vertical up).<br />
                Degrees increase <strong className="text-gray-300">clockwise</strong>.<br />
                Force angle is the absolute direction of the applied force vector.
              </p>
            </div>
          </div>

          <div className="card card-front">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Inputs</h3>
              <UnitSelector />
            </div>
            <div className="space-y-4">
              <NeonSlider label="Input Radius" value={rIn} min={rInRange.min} max={rInRange.max} step={0.1} unit="cm" onChange={setRIn} />
              <NeonSlider label="Output Radius" value={rOut} min={rOutRange.min} max={rOutRange.max} step={0.1} unit="cm" onChange={setROut} />
              <NeonSlider label="Input Angle" value={aIn} min={-180} max={180} step={1} unit="°" onChange={setAIn} />
              <NeonSlider label="Output Angle" value={aOut} min={-180} max={180} step={1} unit="°" onChange={setAOut} />
              <NeonSlider label="Input Force Angle" value={fInAngle} min={-180} max={180} step={1} unit="°" onChange={setFInAngle} />
              <NeonSlider label="Output Force Angle" value={fOutAngle} min={-180} max={180} step={1} unit="°" onChange={setFOutAngle} />
              <NeonSlider label="Input Force" value={fIn} min={0} max={100} step={1} unit="N" onChange={setFIn} />
            </div>
          </div>

          <FormulaReference
            content={`Torque = r × F × sin(θ_force - θ_arm)
MA = |Torque_out / Torque_in|
Equilibrium: Torque_in + Torque_out = 0`}
          />
        </div>
      </div>
    </CalculatorShell>
  );
}