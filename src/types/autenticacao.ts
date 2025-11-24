// src/types/auth.ts

export interface Login {
  email: string;
  password: string;
}

export interface Cadastro {
  name: string;
  age: string;
  email: string;
  password: string;
  confirmPassword: string;
}