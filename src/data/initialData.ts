import { AreaDetails } from '../types';

export const areas: AreaDetails[] = [
  {
    id: 'food-cart-room',
    name: 'Speisenwägen Raum',
    tasks: [
      { id: 'cart-1', name: 'Speisewagen 1 reinigen', frequency: 'daily', area: 'food-cart-room', completed: false },
      { id: 'cart-2', name: 'Speisewagen 2 reinigen', frequency: 'daily', area: 'food-cart-room', completed: false },
      { id: 'cart-3', name: 'Speisewagen 3 reinigen', frequency: 'daily', area: 'food-cart-room', completed: false },
      { id: 'cart-4', name: 'Speisewagen 4 reinigen', frequency: 'daily', area: 'food-cart-room', completed: false },
      { id: 'cart-floor', name: 'Boden reinigen', frequency: 'daily', area: 'food-cart-room', completed: false },
    ]
  },
  {
    id: 'dishwashing',
    name: 'Spülküche',
    tasks: [
      { id: 'dishwasher', name: 'Spülmaschine reinigen', frequency: 'daily', area: 'dishwashing', completed: false },
      { id: 'sink', name: 'Spülbecken reinigen', frequency: 'daily', area: 'dishwashing', completed: false },
      { id: 'floor-dish', name: 'Boden reinigen', frequency: 'daily', area: 'dishwashing', completed: false },
      { id: 'drain-dish', name: 'Abfluss reinigen', frequency: 'daily', area: 'dishwashing', completed: false },
    ]
  },
  {
    id: 'kitchen',
    name: 'Küche',
    tasks: [
      { id: 'fridge-clean', name: 'Kühlschrank Innenreinigung', frequency: 'monthly', area: 'kitchen', completed: false },
      { id: 'fridge-temp', name: 'Kühlschrank Temperatur prüfen', frequency: 'daily', area: 'kitchen', completed: false },
      { id: 'floor-kitchen', name: 'Boden reinigen', frequency: 'daily', area: 'kitchen', completed: false },
      { id: 'drain-kitchen', name: 'Abfluss reinigen', frequency: 'daily', area: 'kitchen', completed: false },
      { id: 'combi-small', name: 'Kleiner Kombidämpfer reinigen', frequency: 'daily', area: 'kitchen', completed: false },
      { id: 'combi-large', name: 'Großer Kombidämpfer reinigen', frequency: 'daily', area: 'kitchen', completed: false },
      { id: 'surfaces', name: 'Oberflächen reinigen', frequency: 'daily', area: 'kitchen', completed: false },
    ]
  },
  {
    id: 'dry-storage',
    name: 'Trockenlager',
    tasks: [
      { id: 'shelves', name: 'Regale reinigen', frequency: 'monthly', area: 'dry-storage', completed: false },
      { id: 'floor-dry', name: 'Boden reinigen', frequency: 'weekly', area: 'dry-storage', completed: false },
    ]
  },
  {
    id: 'cold-storage',
    name: 'Kühlhaus',
    tasks: [
      { id: 'veg-storage', name: 'Gemüse Kühlhaus reinigen', frequency: 'monthly', area: 'cold-storage', completed: false },
      { id: 'front-storage', name: 'Vorderes Kühlhaus reinigen', frequency: 'monthly', area: 'cold-storage', completed: false },
      { id: 'back-storage', name: 'Hinteres Kühlhaus reinigen', frequency: 'monthly', area: 'cold-storage', completed: false },
      { id: 'freezer', name: 'Froster reinigen', frequency: 'monthly', area: 'cold-storage', completed: false },
      { id: 'temp-check', name: 'Temperatur aufzeichnen', frequency: 'daily', area: 'cold-storage', completed: false },
    ]
  },
  {
    id: 'kitchen-supplies',
    name: 'Küchenbedarf Lager',
    tasks: [
      { id: 'supplies-check', name: 'Lager kontrollieren', frequency: 'monthly', area: 'kitchen-supplies', completed: false },
    ]
  }
];