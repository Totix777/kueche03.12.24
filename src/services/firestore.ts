import { collection, addDoc, getDocs, query, orderBy, Timestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Task, Temperature, FoodItem } from '../types';

// Tasks
export const saveTask = async (task: Task): Promise<string> => {
  const tasksRef = collection(db, 'tasks');
  const docRef = await addDoc(tasksRef, {
    ...task,
    timestamp: task.timestamp ? Timestamp.fromDate(new Date(task.timestamp)) : null
  });
  return docRef.id;
};

export const getTasks = async (): Promise<Task[]> => {
  const tasksRef = collection(db, 'tasks');
  const q = query(tasksRef, orderBy('timestamp', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    ...doc.data(),
    id: doc.id,
    timestamp: doc.data().timestamp?.toDate().toISOString()
  })) as Task[];
};

// Temperatures
export const saveTemperature = async (temperature: Omit<Temperature, 'id'>): Promise<string> => {
  const tempRef = collection(db, 'temperatures');
  const docRef = await addDoc(tempRef, {
    ...temperature,
    timestamp: Timestamp.fromDate(new Date(temperature.timestamp))
  });
  return docRef.id;
};

export const getTemperatures = async (): Promise<Temperature[]> => {
  const tempRef = collection(db, 'temperatures');
  const q = query(tempRef, orderBy('timestamp', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    ...doc.data(),
    id: doc.id,
    timestamp: doc.data().timestamp.toDate().toISOString()
  })) as Temperature[];
};

// Food Items
export const saveFoodItem = async (item: Omit<FoodItem, 'id'>): Promise<string> => {
  const foodRef = collection(db, 'foodItems');
  const docRef = await addDoc(foodRef, {
    ...item,
    timestamp: Timestamp.fromDate(new Date(item.timestamp))
  });
  return docRef.id;
};

export const getFoodItems = async (): Promise<FoodItem[]> => {
  const foodRef = collection(db, 'foodItems');
  const q = query(foodRef, orderBy('timestamp', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    ...doc.data(),
    id: doc.id,
    timestamp: doc.data().timestamp.toDate().toISOString()
  })) as FoodItem[];
};