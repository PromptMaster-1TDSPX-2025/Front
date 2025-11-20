import { Outlet } from 'react-router-dom';
import { Header } from './Header'; 
import { Footer } from './footer'; 
import type { UserProfile } from '../types/user';

export function DefaultLayout() {
  const userData: UserProfile = {
    currentLevel: 2,
    currentXP: 10,
    maxXP: 100,
    userNameInitial: "U"
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col text-white">
      
      <Header {...userData} />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
      
    </div>
  );
}