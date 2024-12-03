import { TextInput, NumberInput, Button, Group, Paper } from '@mantine/core';
import { useStore } from '../store/useStore';
import { useState } from 'react';

export const FoodItemForm = () => {
  const [name, setName] = useState('');
  const [temperature, setTemperature] = useState<number | null>(0);
  const addFoodItem = useStore(state => state.addFoodItem);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && temperature !== null) {
      const now = new Date();
      if (now.getHours() >= 11) {
        addFoodItem({
          name,
          temperature,
          timestamp: now.toISOString()
        });
        setName('');
        setTemperature(0);
      } else {
        alert('Lebensmittel können erst ab 11 Uhr eingetragen werden.');
      }
    }
  };

  return (
    <Paper shadow="xs" p="md" mb="md">
      <form onSubmit={handleSubmit}>
        <Group>
          <TextInput
            label="Lebensmittel"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <NumberInput
            label="Temperatur (°C)"
            value={temperature}
            onChange={(val) => setTemperature(val)}
            required
            min={-50}
            max={100}
            step={0.1}
            allowDecimal
            decimalScale={1}
          />
          <Button type="submit" mt={24}>Hinzufügen</Button>
        </Group>
      </form>
    </Paper>
  );
};