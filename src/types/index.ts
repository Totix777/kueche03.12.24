export interface Task {
  id: string;
  name: string;
  frequency: 'daily' | 'weekly' | '14days' | 'monthly';
  area: Area;
  completed: boolean;
  timestamp?: string;
}

export interface Temperature {
  id: string;
  location: string;
  value: number;
  timestamp: string;
}

export interface FoodItem {
  id: string;
  name: string;
  temperature: number;
  timestamp: string;
}

export type Area = 'food-cart-room' | 'dishwashing' | 'kitchen' | 'dry-storage' | 'cold-storage' | 'kitchen-supplies';

export interface AreaDetails {
  id: Area;
  name: string;
  tasks: Task[];
}