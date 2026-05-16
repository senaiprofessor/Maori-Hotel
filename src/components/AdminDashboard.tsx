import React from 'react';
import { motion } from 'motion/react';
import { User, UserRole, Booking } from '../types';
import { 
  BarChart3, 
  Users, 
  BedDouble, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  ChevronRight,
  Search,
  Bell,
  MessageSquare
} from 'lucide-react';

interface AdminDashboardProps {
  user: User;
}

const MOCK_BOOKINGS: Booking[] = [
  { id: '1', guestName: 'Alice Green', roomType: 'Suíte Master', checkIn: '2024-05-20', checkOut: '2024-05-25', status: 'Confirmado', amount: 2500 },
  { id: '2', guestName: 'Bob Brown', roomType: 'Standard', checkIn: '2024-05-22', checkOut: '2024-05-23', status: 'Pendente', amount: 800 },
  { id: '3', guestName: 'Charlie Smith', roomType: 'Deluxe Ocean View', checkIn: '2024-06-01', checkOut: '2024-06-05', status: 'Confirmado', amount: 4200 },
  { id: '4', guestName: 'Diana Prince', roomType: 'Honeymoon Suite', checkIn: '2024-06-10', checkOut: '2024-06-15', status: 'Cancelado', amount: 5000 },
];

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ user }) => {
  const isFinance = user.role === 'Financeiro' || user.role === 'Diretores';
  const isManagement = user.role === 'Gerente' || user.role === 'Administrador' || user.role === 'Diretores';

  return (
    <div className="pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-white">Painel de Controle</h1>
            <p className="text-maori-steel/60">Bem-vindo de volta, {user.name} 👋</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-maori-steel/40" size={18} />
              <input 
                type="text" 
                placeholder="Buscar reservas..."
                className="bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-maori-orange"
              />
            </div>
            <button className="p-2 glass rounded-xl text-maori-steel relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-maori-orange rounded-full" />
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { label: 'Ocupação', value: '84%', icon: BedDouble, trend: '+5.2%', color: 'text-blue-400' },
            { label: 'Receita Mensal', value: 'R$ 142.500', icon: DollarSign, trend: '+12%', color: 'text-green-400' },
            { label: 'Novas Reservas', value: '24', icon: Calendar, trend: '+8%', color: 'text-maori-orange' },
            { label: 'Feedback Positivo', value: '98%', icon: TrendingUp, trend: '+2%', color: 'text-purple-400' },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-white/5 ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
                <span className="text-green-400 text-xs font-bold px-2 py-1 bg-green-400/10 rounded-lg">{stat.trend}</span>
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-maori-steel/50 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-card overflow-hidden">
              <div className="p-6 border-bottom border-white/5 flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Últimas Reservas</h2>
                <button className="text-sm text-maori-orange hover:underline font-medium">Ver todas</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-white/5 text-xs uppercase tracking-wider text-maori-steel/40">
                    <tr>
                      <th className="px-6 py-4">Hóspede</th>
                      <th className="px-6 py-4">Quarto</th>
                      <th className="px-6 py-4">Check-in</th>
                      <th className="px-6 py-4">Valor</th>
                      <th className="px-6 py-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {MOCK_BOOKINGS.map((booking) => (
                      <tr key={booking.id} className="hover:bg-white/5 transition-colors cursor-pointer group">
                        <td className="px-6 py-4">
                          <div className="font-bold text-white group-hover:text-maori-orange transition-colors">{booking.guestName}</div>
                          <div className="text-[10px] text-maori-steel/40">ID: #{booking.id}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-maori-steel/80">{booking.roomType}</td>
                        <td className="px-6 py-4 text-sm text-maori-steel/80">{booking.checkIn}</td>
                        <td className="px-6 py-4 text-sm font-bold text-white">R$ {booking.amount}</td>
                        <td className="px-6 py-4">
                          <span className={`text-[10px] uppercase font-bold px-3 py-1 rounded-full ${
                            booking.status === 'Confirmado' ? 'bg-green-500/10 text-green-400' :
                            booking.status === 'Pendente' ? 'bg-maori-orange/10 text-maori-orange' :
                            'bg-red-500/10 text-red-400'
                          }`}>
                            {booking.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="glass-card p-6">
              <h2 className="text-lg font-bold text-white mb-6">Ações Rápidas</h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Novo Hóspede', icon: Users },
                  { label: 'Check-in', icon: BedDouble },
                  { label: 'Relatórios', icon: BarChart3 },
                  { label: 'Chat Equipe', icon: MessageSquare },
                ].map((action, i) => (
                  <button 
                    key={i}
                    className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-all group"
                  >
                    <action.icon size={20} className="text-maori-steel/60 group-hover:text-maori-orange transition-colors" />
                    <span className="text-[10px] font-bold text-maori-steel/80 uppercase tracking-tighter">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Performance Card */}
            <div className="glass-card p-6 relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-maori-orange/20 blur-3xl rounded-full" />
              <h2 className="text-lg font-bold text-white mb-2">Desempenho Semanal</h2>
              <p className="text-sm text-maori-steel/60 mb-6 font-medium">Meta alcançada: 92%</p>
              
              <div className="space-y-4">
                {[
                  { label: 'Reservas', value: 85 },
                  { label: 'Faturamento', value: 92 },
                  { label: 'Limpeza', value: 78 },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-[10px] uppercase font-bold text-maori-steel/40 mb-1">
                      <span>{item.label}</span>
                      <span>{item.value}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.value}%` }}
                        viewport={{ once: true }}
                        className="h-full bg-maori-orange shadow-[0_0_10px_rgba(219,99,0,0.5)]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
