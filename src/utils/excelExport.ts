import { utils, writeFile } from 'xlsx';
import { Task, Temperature, FoodItem } from '../types';

interface ExportData {
  tasks: Task[];
  temperatures: Temperature[];
  foodItems: FoodItem[];
}

export const exportToExcel = (data: ExportData) => {
  const workbook = utils.book_new();

  // Tasks worksheet
  const tasksData = data.tasks
    .filter(task => task.completed)
    .map(task => ({
      'Bereich': task.area,
      'Aufgabe': task.name,
      'Häufigkeit': task.frequency,
      'Erledigt am': task.timestamp ? new Date(task.timestamp).toLocaleString('de-DE') : '',
    }));
  const tasksSheet = utils.json_to_sheet(tasksData);
  utils.book_append_sheet(workbook, tasksSheet, 'Aufgaben');

  // Temperatures worksheet
  const temperaturesData = data.temperatures.map(temp => ({
    'Ort': temp.location,
    'Temperatur (°C)': temp.value,
    'Zeitpunkt': new Date(temp.timestamp).toLocaleString('de-DE'),
    'Status': temp.location === 'Froster' 
      ? (temp.value <= -18 ? 'OK' : 'Zu warm')
      : (temp.value >= 2 && temp.value <= 7 ? 'OK' : 'Außerhalb des Bereichs'),
  }));
  const temperaturesSheet = utils.json_to_sheet(temperaturesData);
  utils.book_append_sheet(workbook, temperaturesSheet, 'Temperaturen');

  // Food items worksheet
  const foodItemsData = data.foodItems.map(item => ({
    'Lebensmittel': item.name,
    'Temperatur (°C)': item.temperature,
    'Zeitpunkt': new Date(item.timestamp).toLocaleString('de-DE'),
  }));
  const foodItemsSheet = utils.json_to_sheet(foodItemsData);
  utils.book_append_sheet(workbook, foodItemsSheet, 'Lebensmittel');

  // Generate filename with current date
  const date = new Date().toISOString().split('T')[0];
  const filename = `Küche-Hygiene-Protokoll-${date}.xlsx`;

  // Save the file
  writeFile(workbook, filename);
};