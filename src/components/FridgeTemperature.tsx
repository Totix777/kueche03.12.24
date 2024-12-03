import { Paper, Text, Group, NumberInput, Button } from '@mantine/core';
import { useStore } from '../store/useStore';
import { isValidTemperature } from '../utils/temperatureValidation';
import { useState } from 'react';

export const FridgeTemperature = () => {
  const { temperatures, addTemperature } = useStore();
  const [temperature, setTemperature] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (temperature !== null) {
      addTemperature({
        location: 'Kühlschrank',
        value: temperature,
        timestamp: new Date().toISOString()
      });
      setTemperature(0);
    }
  };

  const fridgeTemperatures = temperatures.filter(t => t.location === 'Kühlschrank');
  const lastTemperature = fridgeTemperatures[fridgeTemperatures.length - 1];
  const isValid = lastTemperature && isValidTemperature('Kühlschrank', lastTemperature.value);

  return (
    <Paper shadow="xs" p="md" mb="md">
      <Text size="lg" fw={500} mb="md">Kühlschrank Temperatur</Text>
      
      <form onSubmit={handleSubmit}>
        <Group mb="md">
          <NumberInput
            label="Temperatur (°C)"
            value={temperature}
            onChange={(val) => setTemperature(val)}
            required
            min={-5}
            max={15}
            step={0.1}
            allowDecimal
            decimalScale={1}
            description="Temperatur muss zwischen 2°C und 7°C liegen"
          />
          <Button type="submit" mt={24}>Speichern</Button>
        </Group>
      </form>

      {lastTemperature && (
        <Text color={isValid ? 'green' : 'red'}>
          Aktuelle Temperatur: {lastTemperature.value}°C
          {isValid 
            ? ' (Im grünen Bereich)'
            : ' (Außerhalb des erlaubten Bereichs!)'}
        </Text>
      )}
    </Paper>
  );
};