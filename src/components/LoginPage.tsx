import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { User, UserRole, USER_CREDENTIALS, COMMON_PASSWORD } from '../types';
import { LogIn, Key, Mail, User as UserIcon, Shield, CreditCard, PieChart, Users } from 'lucide-react';

interface LoginPageProps {
  onLogin: (user: User) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e?: React.FormEvent) => {
    e?.preventDefault();
    setError('');

    // Find user by email
    const roles = Object.entries(USER_CREDENTIALS) as [UserRole, string][];
    const match = roles.find(([_, uEmail]) => uEmail === email);

    if (match && password === COMMON_PASSWORD) {
      const [role, uEmail] = match;
      const user: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: role === 'Hospede' ? 'João Silva' : `Equipe ${role}`,
        email: uEmail,
        role: role
      };
      onLogin(user);
      navigate(role === 'Hospede' ? '/' : '/admin');
    } else {
      setError('Credenciais inválidas. Tente usar os atalhos abaixo.');
    }
  };

  const autofill = (role: UserRole) => {
    setEmail(USER_CREDENTIALS[role]);
    setPassword(COMMON_PASSWORD);
  };

  const shortcutIcons: Record<UserRole, any> = {
    'Hospede': UserIcon,
    'Administrador': Shield,
    'Financeiro': CreditCard,
    'Gerente': PieChart,
    'Diretores': Users
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="glass-card p-8 mb-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-display font-bold text-white mb-2">Bem-vindo</h2>
            <p className="text-maori-steel/60 text-sm">Acesse sua conta Maori Mantiqueira</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-maori-steel/50 mb-1 ml-1">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-maori-steel/40" size={18} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3 focus:outline-none focus:ring-2 focus:ring-maori-orange/50 text-white transition-all"
                  placeholder="seu@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-maori-steel/50 mb-1 ml-1">Senha</label>
              <div className="relative">
                <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-maori-steel/40" size={18} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3 focus:outline-none focus:ring-2 focus:ring-maori-orange/50 text-white transition-all"
                  placeholder="******"
                  required
                />
              </div>
            </div>

            {error && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-400 text-xs text-center font-medium"
              >
                {error}
              </motion.p>
            )}

            <button 
              type="submit"
              className="w-full bg-maori-orange hover:bg-orange-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-maori-orange/20"
            >
              <LogIn size={20} />
              Entrar
            </button>
          </form>
        </div>

        {/* Shortcuts Card */}
        <div className="glass-card p-6 bg-white/5">
          <h3 className="text-xs font-bold uppercase tracking-widest text-maori-steel/40 mb-4 text-center">Atalhos de Acesso</h3>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {(Object.keys(USER_CREDENTIALS) as UserRole[]).map((role) => {
              const Icon = shortcutIcons[role];
              return (
                <button
                  key={role}
                  onClick={() => autofill(role)}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-white/10 border border-transparent hover:border-white/10 transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-maori-orange/10 flex items-center justify-center text-maori-orange group-hover:bg-maori-orange group-hover:text-white transition-all">
                    <Icon size={20} />
                  </div>
                  <span className="text-[10px] font-bold text-maori-steel group-hover:text-white transition-colors">{role}</span>
                </button>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
