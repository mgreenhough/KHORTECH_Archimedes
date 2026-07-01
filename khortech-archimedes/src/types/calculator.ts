export interface CalculatorSchema {
  id: string;
  name: string;
  category: string;
  description: string;
  inputs: InputField[];
  outputs: OutputField[];
  visualizationType: 'canvas' | 'svg' | 'recharts' | 'none';
  formulaReference: string;
}

export interface InputField {
  key: string;
  label: string;
  type: 'slider' | 'number' | 'select' | 'boolean';
  min?: number;
  max?: number;
  step?: number;
  default: number | string | boolean;
  unit?: string;
  unitOptions?: string[];
}

export interface OutputField {
  key: string;
  label: string;
  formula: string;
  precision: number;
  unit?: string;
  highlight?: 'primary' | 'secondary' | 'warning';
}

export type UnitSystem = 'metric' | 'imperial';

export interface CalculatorCategory {
  id: string;
  name: string;
  icon: string;
  calculators: CalculatorSchema[];
}