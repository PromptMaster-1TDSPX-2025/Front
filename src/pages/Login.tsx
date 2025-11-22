import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FormInput } from '../components/form-input';
import type { Login } from '../types/autenticacao';

export function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Login>({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-gray-800 rounded-xl shadow-2xl p-8 border border-gray-700">
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Bem-vindo!</h2>
          <p className="text-gray-400">Entre para continuar.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-2">
          <FormInput 
            label="E-mail"
            name="email"
            type="email"
            placeholder="seu@email.com"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <FormInput 
            label="Senha"
            name="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <div className="flex justify-end mb-6">
            <a href="#" className="text-sm text-purple-400 hover:text-purple-300">
              Esqueceu a senha?
            </a>
          </div>

          <button 
            type="submit" 
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-colors shadow-lg mt-6"
          >
            Entrar
          </button>
        </form>

        <div className="mt-6 text-center text-gray-400 text-sm">
          Não tem uma conta?{' '}
          <Link to="/cadastro" className="text-green-500 hover:text-green-400 font-semibold">
            Crie agora
          </Link>
        </div>

        <div className="mt-8 text-center">
          <Link to="/" className="text-gray-500 hover:text-white text-sm">
            ← Voltar para o início
          </Link>
        </div>
      </div>
    </div>
  );
}