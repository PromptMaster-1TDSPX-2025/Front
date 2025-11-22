import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FormInput } from '../components/form-input';
import type { Cadastro } from '../types/autenticacao';

export function Cadastro() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState<Cadastro>({
    name: '',
    age: '', 
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }

    setIsLoading(true);

    // Converte a idade para número (inteiro) antes de enviar
    const idadeInt = parseInt(formData.age, 10);

    const payload = {
      login: formData.email,
      senha: formData.password,
      usuario: {
        nome: formData.name,
        idade: isNaN(idadeInt) ? 18 : idadeInt, // Garante um valor válido
        totalXp: 0,
        nivel: 1
      }
    };

    try {
      const response = await fetch('https://promptmaster-java.onrender.com/usuarios/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Conta criada com sucesso! Faça login para continuar.");
        navigate('/login'); 
      } else {
        const errorData = await response.text(); 
        alert(`Erro ao cadastrar: ${errorData}`);
      }

    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro de conexão com o servidor.");
    } finally {
      setIsLoading(false);
    }
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
            label="Idade"
            name="age"
            type="number"
            placeholder="Ex: 25"
            value={formData.age}
            onChange={handleChange}
            required
            min={1} 
            max={120}
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
            disabled={isLoading}
            className={`w-full py-3 bg-green-600 text-white font-bold rounded-lg transition-colors shadow-lg mt-6 
              ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'}`}
          >
            {isLoading ? 'Criando conta...' : 'Criar Conta'}
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