import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { Exercicios } from './pages/Exercicios';
import { Atividade } from './components/Atividade';
import { Header } from './components/Header';

const App: React.FC = () => {
  const userStats = {
    currentLevel: 2,
    currentXP: 10,
    maxXP: 100,
    userNameInitial: 'U',
    activeLink: 'Dashboard',
  };

  return (
    <Router>
      <div className="bg-gray-900 min-h-screen text-white">
        <Header {...userStats} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/exercicios/:missaoId" element={<Exercicios />} />
          <Route path="/atividade/:missaoId" element={<Atividade />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
