import { MantineProvider, Container, Title, Tabs, createTheme, Group } from '@mantine/core';
import { useEffect } from 'react';
import { useStore } from './store/useStore';
import { TaskList } from './components/TaskList';
import { FoodItemForm } from './components/FoodItemForm';
import { TemperatureLog } from './components/TemperatureLog';
import { ExportButton } from './components/ExportButton';
import { areas } from './data/initialData';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import 'dayjs/locale/de';

const theme = createTheme({
  primaryColor: 'blue',
  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
});

export default function App() {
  const { tasks, initializeTasks, loadData } = useStore();

  useEffect(() => {
    const initialize = async () => {
      await initializeTasks();
      await loadData();
    };
    initialize();
  }, []);

  return (
    <MantineProvider theme={theme} defaultColorScheme="light">
      <Container size="lg" py="xl">
        <Group justify="space-between" mb="xl">
          <Title order={1}>Küche Hygiene Management</Title>
          <ExportButton />
        </Group>

        <Tabs defaultValue="daily">
          <Tabs.List>
            <Tabs.Tab value="daily">Täglich</Tabs.Tab>
            <Tabs.Tab value="weekly">Wöchentlich</Tabs.Tab>
            <Tabs.Tab value="biweekly">14-Tägig</Tabs.Tab>
            <Tabs.Tab value="monthly">Monatlich</Tabs.Tab>
            <Tabs.Tab value="food">Lebensmittel</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="daily" pt="md">
            {areas.map(area => (
              <TaskList
                key={area.id}
                title={area.name}
                tasks={tasks.filter(t => t.area === area.id && t.frequency === 'daily')}
              />
            ))}
          </Tabs.Panel>

          <Tabs.Panel value="weekly" pt="md">
            {areas.map(area => (
              <TaskList
                key={area.id}
                title={area.name}
                tasks={tasks.filter(t => t.area === area.id && t.frequency === 'weekly')}
              />
            ))}
          </Tabs.Panel>

          <Tabs.Panel value="biweekly" pt="md">
            {areas.map(area => (
              <TaskList
                key={area.id}
                title={area.name}
                tasks={tasks.filter(t => t.area === area.id && t.frequency === '14days')}
              />
            ))}
          </Tabs.Panel>

          <Tabs.Panel value="monthly" pt="md">
            {areas.map(area => (
              <TaskList
                key={area.id}
                title={area.name}
                tasks={tasks.filter(t => t.area === area.id && t.frequency === 'monthly')}
              />
            ))}
          </Tabs.Panel>

          <Tabs.Panel value="food" pt="md">
            <FoodItemForm />
            <TemperatureLog />
          </Tabs.Panel>
        </Tabs>
      </Container>
    </MantineProvider>
  );
}