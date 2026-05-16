/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { LoginPage } from './components/LoginPage';
import { AdminDashboard } from './components/AdminDashboard';
import { User } from './types';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  // Initialize from localStorage if exists
  useEffect(() => {
    const savedUser = localStorage.getItem('maori_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (u: User) => {
    setUser(u);
    localStorage.setItem('maori_user', JSON.stringify(u));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('maori_user');
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-maori-dark overflow-x-hidden">
        <Navbar user={user} onLogout={handleLogout} />
        
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route 
            path="/login" 
            element={user ? <Navigate to={user.role === 'Hospede' ? '/' : '/admin'} /> : <LoginPage onLogin={handleLogin} />} 
          />
          <Route 
            path="/admin" 
            element={
              user && user.role !== 'Hospede' ? (
                <AdminDashboard user={user} />
              ) : (
                <Navigate to="/login" />
              )
            } 
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        {/* Footer */}
        <footer className="px-6 py-20 border-t border-white/5 mt-20 bg-black/20">
          <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-maori-orange rounded flex items-center justify-center font-display text-white font-bold text-lg">M</div>
                <span className="font-display text-xl font-bold tracking-tight text-white uppercase">MAORI MANTIQUEIRA</span>
              </div>
              <p className="text-maori-steel/50 text-sm leading-relaxed">
                Hospedagem de excelência em Cruzeiro, SP. Onde o conforto encontra a história e a natureza do Vale do Paraíba.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Contatos</h4>
              <ul className="space-y-3 text-sm text-maori-steel/60">
                <li>Rua Capitão Neco, 631, Cruzeiro/SP</li>
                <li>Tel: (12) 3141-7904</li>
                <li>WhatsApp: (12) 3141-7904</li>
                <li>reservas@maorihotel.com.br</li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Siga-nos</h4>
              <div className="flex gap-4">
                <a href="https://www.instagram.com/maorimantiqueirahotel?igsh=YnUzYmV5bHEzd2dk&utm_source=qr" target="_blank" rel="noopener noreferrer" className="p-3 glass rounded-xl text-maori-steel hover:text-maori-orange hover:border-maori-orange/50 transition-all flex items-center gap-2">
                  <span className="text-xs font-bold uppercase">Instagram</span>
                </a>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-white/5">
            <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-maori-steel/30">
              <a href="#" className="hover:text-maori-orange transition-colors">Privacidade</a>
              <a href="#" className="hover:text-maori-orange transition-colors">Termos</a>
              <a href="https://www.maorihotel.com.br" target="_blank" rel="noopener noreferrer" className="hover:text-maori-orange transition-colors">maorihotel.com.br</a>
            </div>
            <div className="text-[10px] font-bold text-maori-steel/30 uppercase tracking-widest">
              © {new Date().getFullYear()} Maori Mantiqueira Hotel.
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

