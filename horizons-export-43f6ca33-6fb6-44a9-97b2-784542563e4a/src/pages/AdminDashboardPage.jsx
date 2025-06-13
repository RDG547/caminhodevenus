
import React, { useState } from 'react';
import { useNavigate, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, LogOut, Users, Edit, BarChart3, CalendarCheck, Settings, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabaseClient';
import { useNotifications } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import AvailabilityManager from '@/components/admin/AvailabilityManager';

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addNotification } = useNotifications();
  
  const handleLogout = async () => {
    localStorage.removeItem('isAdminAuthenticated');
    localStorage.removeItem('adminUserEmail');
    await supabase.auth.signOut();
    addNotification({ type: "info", title: "Logout Admin", message: "Você saiu do painel." });
    navigate('/admin-login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin-dashboard', icon: LayoutDashboard },
    { name: 'Disponibilidade', path: 'availability', icon: CalendarCheck },
    { name: 'Conteúdo (em breve)', path: '#', icon: Edit, disabled: true },
    { name: 'Usuários (em breve)', path: '#', icon: Users, disabled: true },
    { name: 'Estatísticas (em breve)', path: '#', icon: BarChart3, disabled: true },
    { name: 'Configurações (em breve)', path: '#', icon: Settings, disabled: true },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-800/80 backdrop-blur-sm p-6 flex-shrink-0 flex flex-col">
        <div className="flex items-center space-x-3 mb-10">
          <Star className="h-8 w-8 text-purple-400" />
          <h1 className="font-cinzel text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            Caminho de Vênus
          </h1>
        </div>
        <nav className="flex-grow">
          <ul>
            {navItems.map(item => (
              <li key={item.name}>
                <Link 
                  to={item.path} 
                  className={cn(
                    "flex items-center space-x-3 px-4 py-3 my-2 rounded-lg transition-colors duration-200",
                    location.pathname.endsWith(item.path) && "bg-purple-500/30 text-purple-200",
                    item.disabled 
                      ? "text-slate-500 cursor-not-allowed" 
                      : "text-slate-300 hover:bg-purple-500/20 hover:text-white"
                  )}
                  onClick={(e) => {
                    if (item.disabled) {
                      e.preventDefault();
                      addNotification({type: "info", title: "Em Breve", message: "Esta funcionalidade será implementada em breve."})
                    }
                  }}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <Button onClick={handleLogout} variant="ghost" className="w-full justify-start text-slate-400 hover:bg-pink-600/30 hover:text-pink-300">
            <LogOut className="mr-3 h-5 w-5" />
            Sair
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Routes>
          <Route index element={<DashboardHome />} />
          <Route path="availability" element={<AvailabilityManager />} />
          {/* Add other routes here as they are built */}
        </Routes>
      </main>
    </div>
  );
};

const DashboardHome = () => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
    <h2 className="text-4xl font-semibold mb-4 text-slate-200 font-cinzel">Bem-vindo(a) ao Centro de Comando!</h2>
    <p className="text-lg text-slate-400 mb-8">Gerencie os aspectos místicos do Caminho de Vênus a partir do menu à esquerda.</p>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      <DashboardCard icon={CalendarCheck} title="Gerenciar Disponibilidade" description="Defina seus horários de atendimento para que os usuários possam agendar consultas." />
      <DashboardCard icon={Edit} title="Gerenciar Conteúdo" description="Editar textos e imagens do site (em breve)." />
      <DashboardCard icon={Users} title="Gerenciar Usuários" description="Visualizar e gerenciar contas de usuários (em breve)." />
    </div>
  </motion.div>
);

const DashboardCard = ({ icon: Icon, title, description }) => (
  <div className="bg-slate-800/60 backdrop-blur-sm p-6 rounded-lg shadow-xl border border-slate-700">
    <div className="flex items-center justify-center mb-4 bg-gradient-to-br from-purple-600 to-indigo-600 w-16 h-16 rounded-full mx-auto">
      <Icon className="h-8 w-8 text-white" />
    </div>
    <h3 className="text-xl font-semibold text-center mb-2 text-purple-300">{title}</h3>
    <p className="text-slate-400 text-center text-sm flex-grow">{description}</p>
  </div>
);

export default AdminDashboardPage;
