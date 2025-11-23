import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FormInput } from '../components/form-input';
import { useAuth } from '../contexts/useAuth';
import type { Login as LoginType } from '../types/autenticacao';

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<LoginType>({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = {
      login: formData.email,
      senha: formData.password
    };

    try {
      const response = await fetch('https://promptmaster-java.onrender.com/login/autenticar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const usuario = await response.json();
        
        login({
          id: usuario.id,
          nome: usuario.nome,
          totalXp: usuario.totalXp,
          nivel: usuario.nivel
        });

        navigate('/dashboard');
      } else {
        alert("E-mail ou senha inválidos.");
      }
    } catch (error) {
      console.error("Erro de login:", error);
      alert("Erro ao conectar com o servidor.");
    } finally {
      setIsLoading(false);
    }
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
            disabled={isLoading}
            className={`w-full py-3 bg-purple-600 text-white font-bold rounded-lg transition-colors shadow-lg mt-6 
              ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-700'}`}
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
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