import { signInWithEmailAndPassword, signOut as firebaseSignOut, User, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { saveUserLogin } from './firestore';

// Create a test user if it doesn't exist
export const createTestUserIfNeeded = async () => {
  try {
    const email = 'test@drk-kitchen.local';
    const password = 'Melm3';
    
    try {
      // Try to sign in first
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      // If user doesn't exist, create it
      if (error.code === 'auth/user-not-found') {
        await createUserWithEmailAndPassword(auth, email, password);
        console.log('Test user created successfully');
      } else {
        throw error;
      }
    }
  } catch (error: any) {
    console.error('Error in createTestUserIfNeeded:', error);
  }
};

export const signIn = async (username: string, password: string): Promise<User> => {
  try {
    // Always use the test account email, but store the actual username
    const email = 'test@drk-kitchen.local';
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    // Save the login with the actual username
    await saveUserLogin({
      username,
      timestamp: new Date().toISOString()
    });
    
    // Store the username in localStorage for display purposes
    localStorage.setItem('drk_kitchen_username', username);
    
    return userCredential.user;
  } catch (error: any) {
    console.error('Login error:', error);
    throw new Error('Anmeldung fehlgeschlagen. Bitte überprüfen Sie Ihre Anmeldedaten.');
  }
};

export const signOut = async () => {
  localStorage.removeItem('drk_kitchen_username');
  return firebaseSignOut(auth);
};

export const getCurrentUser = () => auth.currentUser;

export const getCurrentUsername = () => localStorage.getItem('drk_kitchen_username') || '';