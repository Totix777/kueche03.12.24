import React, { useState } from 'react';
import { Table, Paper, Text, Group, NumberInput, Select, Button } from '@mantine/core';
import { useStore } from '../store/useStore';
import { FridgeTemperature } from './FridgeTemperature';
import { isValidTemperature } from '../utils/temperatureValidation';

export const TemperatureLog: React.FC = () => {
  const { temperatures, addTemperature } = useStore();
  const [location, setLocation] = useState<string>('');
  const [temperature, setTemperature] = useState<number | ''>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (location && typeof temperature === 'number') {
      addTemperature({
        location,
        value: temperature,
        timestamp: new Date().toISOString()
      });
      setLocation('');
      setTemperature(0);
    }
  };

  const storageTemperatures = temperatures.filter(t => t.location !== 'Kühlschrank');

  return (
    <>
      <FridgeTemperature />
      
      <Paper shadow="xs" p="md">
        <Text size="lg" fw={500} mb="md">Temperaturprotokoll Lagerräume</Text>
        
        <form onSubmit={handleSubmit}>
          <Group mb="md">
            <Select
              label="Kühlbereich"
              placeholder="Bereich auswählen"
              value={location}
              onChange={(value) => setLocation(value || '')}
              data={[
                { value: 'Gemüse Kühlhaus', label: 'Gemüse Kühlhaus' },
                { value: 'Vorderes Kühlhaus', label: 'Vorderes Kühlhaus' },
                { value: 'Hinteres Kühlhaus', label: 'Hinteres Kühlhaus' },
                { value: 'Froster', label: 'Froster' },
              ]}
              required
            />
            <NumberInput
              label="Temperatur (°C)"
              value={temperature}
              onChange={(value) => setTemperature(value)}
              step={0.1}
              required
              description={location === 'Froster' ? 
                'Temperatur muss -18°C oder kälter sein' : 
                'Temperatur muss zwischen 2°C und 7°C liegen'}
            />
            <Button type="submit" mt={24}>Hinzufügen</Button>
          </Group>
        </form>

        <Table>
          <thead>
            <tr>
              <th>Ort</th>
              <th>Temperatur (°C)</th>
              <th>Zeitpunkt</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {storageTemperatures.map(temp => {
              const valid = isValidTemperature(temp.location, temp.value);
              return (
                <tr key={temp.id}>
                  <td>{temp.location}</td>
                  <td style={{ color: valid ? 'inherit' : 'red' }}>{temp.value}°C</td>
                  <td>{new Date(temp.timestamp).toLocaleString()}</td>
                  <td style={{ color: valid ? 'green' : 'red' }}>
                    {valid ? 'OK' : 'Außerhalb des erlaubten Bereichs!'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Paper>
    </>
  );
};