export const isValidTemperature = (location: string, value: number): boolean => {
  if (location === 'Froster') {
    return value <= -18;
  }
  return value >= 2 && value <= 7;
};