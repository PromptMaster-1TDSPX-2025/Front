import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { Integrantes } from './pages/integrantes';
import { Faq } from './pages/Faq';
import { Sobre } from './pages/sobre-nos';
import { Atividade } from './components/Atividade';
import { Exercicios } from './pages/Exercicios';
import { Cadastro } from './pages/Cadastro';
import { Login } from './pages/Login';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        <Route index element={<Home />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="integrantes" element={<Integrantes />} />
        <Route path="faq" element={<Faq />} />
        <Route path="sobre" element={<Sobre />} />
        <Route path="exercicios/:missaoId" element={<Exercicios />} />
        <Route path="atividade/:missaoId" element={<Atividade />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
    </Routes>
  );
}

export default App;