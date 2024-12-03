import { create } from 'zustand';
import { Task, Temperature, FoodItem } from '../types';
import { areas } from '../data/initialData';
import { saveTask, getTasks, saveTemperature, getTemperatures, saveFoodItem, getFoodItems } from '../services/firestore';

interface Store {
  tasks: Task[];
  temperatures: Temperature[];
  foodItems: FoodItem[];
  selectedDate: Date;
  addFoodItem: (item: Omit<FoodItem, 'id'>) => void;
  addTemperature: (temp: Omit<Temperature, 'id'>) => void;
  toggleTask: (taskId: string) => void;
  initializeTasks: () => Promise<void>;
  loadData: () => Promise<void>;
}

export const useStore = create<Store>((set, get) => ({
  tasks: [],
  temperatures: [],
  foodItems: [],
  selectedDate: new Date(),
  
  addFoodItem: async (item) => {
    const id = await saveFoodItem(item);
    set((state) => ({
      foodItems: [...state.foodItems, { ...item, id }]
    }));
  },
  
  addTemperature: async (temp) => {
    const id = await saveTemperature(temp);
    set((state) => ({
      temperatures: [...state.temperatures, { ...temp, id }]
    }));
  },
  
  toggleTask: async (taskId) => {
    const task = get().tasks.find(t => t.id === taskId);
    if (task) {
      const updatedTask = {
        ...task,
        completed: !task.completed,
        timestamp: new Date().toISOString()
      };
      await saveTask(updatedTask);
      set((state) => ({
        tasks: state.tasks.map(t =>
          t.id === taskId ? updatedTask : t
        )
      }));
    }
  },
  
  initializeTasks: async () => {
    // First, get existing tasks from Firestore
    const existingTasks = await getTasks();
    const existingTaskIds = new Set(existingTasks.map(t => t.id));
    
    // Get all tasks from initial data
    const allTasks = areas.flatMap(area => area.tasks);
    
    // Filter out tasks that already exist in Firestore
    const newTasks = allTasks.filter(task => !existingTaskIds.has(task.id));
    
    // Save new tasks to Firestore
    const savedTaskPromises = newTasks.map(task => saveTask(task));
    await Promise.all(savedTaskPromises);
    
    // Set all tasks in the store
    set({ tasks: [...existingTasks, ...newTasks] });
  },

  loadData: async () => {
    const [tasks, temperatures, foodItems] = await Promise.all([
      getTasks(),
      getTemperatures(),
      getFoodItems()
    ]);
    set({ tasks, temperatures, foodItems });
  }
}));