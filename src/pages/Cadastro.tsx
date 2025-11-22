import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FormInput } from '../components/form-input';
import type { Cadastro} from '../types/autenticacao';

export function Cadastro() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Cadastro>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }

    console.log(formData);
    alert("Conta criada com sucesso! Faça login para continuar.");
    navigate('/login'); 
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-gray-800 rounded-xl shadow-2xl p-8 border border-gray-700">
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Crie sua conta</h2>
          <p className="text-gray-400">Comece a dominar a Engenharia de Prompt.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-2">
          
          <FormInput 
            label="Nome Completo"
            name="name"
            type="text"
            placeholder="Ex: João Silva"
            value={formData.name}
            onChange={handleChange}
            required
          />

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

          <FormInput 
            label="Confirmar Senha"
            name="confirmPassword"
            type="password"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <button 
            type="submit" 
            className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors shadow-lg mt-6"
          >
            Criar Conta
          </button>
        </form>

        <div className="mt-6 text-center text-gray-400 text-sm">
          Já tem uma conta?{' '}
          <Link to="/login" className="text-purple-400 hover:text-purple-300 font-semibold">
            Fazer Login
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