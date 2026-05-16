import React from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { User, UserRole } from '../types';
import { LogOut, User as UserIcon, Settings } from 'lucide-react';

interface NavbarProps {
  user?: User | null;
  onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ user, onLogout }) => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between glass px-6 py-3 rounded-2xl">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-maori-orange rounded-lg flex items-center justify-center font-display text-white font-bold text-xl">M</div>
          <span className="font-display text-xl font-bold tracking-tight text-white">MAORI MANTIQUEIRA</span>
        </Link>

        <div className="flex items-center gap-4">
          {!user ? (
            <Link 
              to="/login" 
              className="bg-maori-orange hover:bg-orange-600 text-white px-6 py-2 rounded-xl transition-all duration-300 font-medium shadow-lg shadow-maori-orange/20"
            >
              Entrar
            </Link>
          ) : (
            <div className="flex items-center gap-4">
              <div className="hidden md:flex flex-col items-end">
                <span className="text-sm font-semibold text-white">{user.name}</span>
                <span className="text-[10px] uppercase tracking-wider text-maori-steel/60">{user.role}</span>
              </div>
              
              <div className="flex items-center gap-2">
                {user.role !== 'Hospede' && (
                  <button 
                    onClick={() => navigate('/admin')}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors text-maori-steel"
                    title="Painel Administrativo"
                  >
                    <Settings size={20} />
                  </button>
                )}
                <button 
                  onClick={onLogout}
                  className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                  title="Sair"
                >
                  <LogOut size={20} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
