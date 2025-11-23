import { createContext } from "react";

// Tipos
export type User = {
  id: number;
  nome: string;
  totalXp: number;
  nivel: number;
};

export type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

