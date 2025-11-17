import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import type { UserProfile } from './types/user'; 

// Importando as páginas
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';


function App() {
  // Usando o tipo para os dados mockados
  const userData: UserProfile = {
    currentLevel: 2,
    currentXP: 10,
    maxXP: 100,
    userNameInitial: "U"
  };

  return (
    <div className="min-h-screen bg-gray-900">
      
      {/* Passando os dados para o Header */}
      <Header {...userData} />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;