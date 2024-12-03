import { create } from 'zustand';
import { User } from 'firebase/auth';
import { signIn, signOut, getCurrentUser } from '../services/auth';

interface AuthStore {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: getCurrentUser(),
  loading: false,
  error: null,
  
  login: async (username: string, password: string) => {
    set({ loading: true, error: null });
    try {
      const user = await signIn(username, password);
      set({ user, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
  
  logout: async () => {
    set({ loading: true });
    try {
      await signOut();
      set({ user: null, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
  
  setUser: (user) => set({ user }),
}));