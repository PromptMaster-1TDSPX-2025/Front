import { Routes, Route } from 'react-router-dom';
import { DefaultLayout } from './components/Layout';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { Integrantes } from './pages/integrantes'; 
import { Faq } from './pages/Faq';
import { Sobre } from './pages/sobre-nos'; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
      
        <Route index element={<Home />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="integrantes" element={<Integrantes />} />
        <Route path="faq" element={<Faq />} />
        <Route path="sobre" element={<Sobre />} />
        
      </Route>
    </Routes>
  );
}

export default App;