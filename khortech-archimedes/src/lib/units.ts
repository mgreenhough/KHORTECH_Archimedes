export type UnitCategory = 'length' | 'mass' | 'force' | 'torque' | 'pressure' | 'power' | 'temperature' | 'angle' | 'velocity' | 'acceleration';

export interface UnitDefinition {
  symbol: string;
  toSI: (value: number) => number;
  fromSI: (value: number) => number;
}

export const UNITS: Record<UnitCategory, Record<string, UnitDefinition>> = {
  length: {
    m: { symbol: 'm', toSI: (v) => v, fromSI: (v) => v },
    mm: { symbol: 'mm', toSI: (v) => v / 1000, fromSI: (v) => v * 1000 },
    cm: { symbol: 'cm', toSI: (v) => v / 100, fromSI: (v) => v * 100 },
    km: { symbol: 'km', toSI: (v) => v * 1000, fromSI: (v) => v / 1000 },
    in: { symbol: 'in', toSI: (v) => v * 0.0254, fromSI: (v) => v / 0.0254 },
    ft: { symbol: 'ft', toSI: (v) => v * 0.3048, fromSI: (v) => v / 0.3048 },
    yd: { symbol: 'yd', toSI: (v) => v * 0.9144, fromSI: (v) => v / 0.9144 },
    mi: { symbol: 'mi', toSI: (v) => v * 1609.344, fromSI: (v) => v / 1609.344 },
  },
  mass: {
    kg: { symbol: 'kg', toSI: (v) => v, fromSI: (v) => v },
    g: { symbol: 'g', toSI: (v) => v / 1000, fromSI: (v) => v * 1000 },
    mg: { symbol: 'mg', toSI: (v) => v / 1_000_000, fromSI: (v) => v * 1_000_000 },
    lb: { symbol: 'lb', toSI: (v) => v * 0.453592, fromSI: (v) => v / 0.453592 },
    oz: { symbol: 'oz', toSI: (v) => v * 0.0283495, fromSI: (v) => v / 0.0283495 },
    ton: { symbol: 'ton', toSI: (v) => v * 1000, fromSI: (v) => v / 1000 },
  },
  force: {
    N: { symbol: 'N', toSI: (v) => v, fromSI: (v) => v },
    kN: { symbol: 'kN', toSI: (v) => v * 1000, fromSI: (v) => v / 1000 },
    lbf: { symbol: 'lbf', toSI: (v) => v * 4.44822, fromSI: (v) => v / 4.44822 },
    kgf: { symbol: 'kgf', toSI: (v) => v * 9.80665, fromSI: (v) => v / 9.80665 },
  },
  torque: {
    'N·m': { symbol: 'N·m', toSI: (v) => v, fromSI: (v) => v },
    'N·mm': { symbol: 'N·mm', toSI: (v) => v / 1000, fromSI: (v) => v * 1000 },
    'lbf·ft': { symbol: 'lbf·ft', toSI: (v) => v * 1.35582, fromSI: (v) => v / 1.35582 },
    'lbf·in': { symbol: 'lbf·in', toSI: (v) => v * 0.112985, fromSI: (v) => v / 0.112985 },
    'kgf·m': { symbol: 'kgf·m', toSI: (v) => v * 9.80665, fromSI: (v) => v / 9.80665 },
  },
  pressure: {
    Pa: { symbol: 'Pa', toSI: (v) => v, fromSI: (v) => v },
    kPa: { symbol: 'kPa', toSI: (v) => v * 1000, fromSI: (v) => v / 1000 },
    MPa: { symbol: 'MPa', toSI: (v) => v * 1_000_000, fromSI: (v) => v / 1_000_000 },
    bar: { symbol: 'bar', toSI: (v) => v * 100_000, fromSI: (v) => v / 100_000 },
    psi: { symbol: 'psi', toSI: (v) => v * 6894.76, fromSI: (v) => v / 6894.76 },
    atm: { symbol: 'atm', toSI: (v) => v * 101325, fromSI: (v) => v / 101325 },
  },
  power: {
    W: { symbol: 'W', toSI: (v) => v, fromSI: (v) => v },
    kW: { symbol: 'kW', toSI: (v) => v * 1000, fromSI: (v) => v / 1000 },
    MW: { symbol: 'MW', toSI: (v) => v * 1_000_000, fromSI: (v) => v / 1_000_000 },
    hp: { symbol: 'hp', toSI: (v) => v * 745.7, fromSI: (v) => v / 745.7 },
    'ft·lbf/s': { symbol: 'ft·lbf/s', toSI: (v) => v * 1.35582, fromSI: (v) => v / 1.35582 },
  },
  temperature: {
    '°C': { symbol: '°C', toSI: (v) => v, fromSI: (v) => v },
    '°F': { symbol: '°F', toSI: (v) => (v - 32) * 5 / 9, fromSI: (v) => v * 9 / 5 + 32 },
    K: { symbol: 'K', toSI: (v) => v - 273.15, fromSI: (v) => v + 273.15 },
  },
  angle: {
    '°': { symbol: '°', toSI: (v) => v, fromSI: (v) => v },
    rad: { symbol: 'rad', toSI: (v) => (v * 180) / Math.PI, fromSI: (v) => (v * Math.PI) / 180 },
  },
  velocity: {
    'm/s': { symbol: 'm/s', toSI: (v) => v, fromSI: (v) => v },
    'km/h': { symbol: 'km/h', toSI: (v) => v / 3.6, fromSI: (v) => v * 3.6 },
    'ft/s': { symbol: 'ft/s', toSI: (v) => v * 0.3048, fromSI: (v) => v / 0.3048 },
    mph: { symbol: 'mph', toSI: (v) => v * 0.44704, fromSI: (v) => v / 0.44704 },
  },
  acceleration: {
    'm/s²': { symbol: 'm/s²', toSI: (v) => v, fromSI: (v) => v },
    'ft/s²': { symbol: 'ft/s²', toSI: (v) => v * 0.3048, fromSI: (v) => v / 0.3048 },
    g: { symbol: 'g', toSI: (v) => v * 9.80665, fromSI: (v) => v / 9.80665 },
  },
};

export function convertValue(
  value: number,
  fromUnit: string,
  toUnit: string,
  category: UnitCategory
): number {
  if (fromUnit === toUnit) return value;
  const cat = UNITS[category];
  if (!cat) throw new Error(`Unknown unit category: ${category}`);
  const from = cat[fromUnit];
  const to = cat[toUnit];
  if (!from || !to) throw new Error(`Unknown unit: ${fromUnit} or ${toUnit}`);
  const siValue = from.toSI(value);
  return to.fromSI(siValue);
}

export function getDefaultUnit(category: UnitCategory, unitSystem: 'metric' | 'imperial'): string {
  const defaults: Record<UnitCategory, Record<string, string>> = {
    length: { metric: 'm', imperial: 'ft' },
    mass: { metric: 'kg', imperial: 'lb' },
    force: { metric: 'N', imperial: 'lbf' },
    torque: { metric: 'N·m', imperial: 'lbf·ft' },
    pressure: { metric: 'Pa', imperial: 'psi' },
    power: { metric: 'W', imperial: 'hp' },
    temperature: { metric: '°C', imperial: '°F' },
    angle: { metric: '°', imperial: '°' },
    velocity: { metric: 'm/s', imperial: 'ft/s' },
    acceleration: { metric: 'm/s²', imperial: 'ft/s²' },
  };
  return defaults[category]?.[unitSystem] || Object.keys(UNITS[category])[0];
}

export function formatValue(value: number, precision: number = 3): string {
  if (Math.abs(value) < 1e-6) return '0';
  if (Math.abs(value) >= 1e6 || (Math.abs(value) < 1e-3 && Math.abs(value) > 0)) {
    return value.toExponential(precision);
  }
  return value.toFixed(precision).replace(/\.?0+$/, '');
}