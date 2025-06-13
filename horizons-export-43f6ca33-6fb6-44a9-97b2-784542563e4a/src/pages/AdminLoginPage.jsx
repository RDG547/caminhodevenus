
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Key, LogIn, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNotifications } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabaseClient';

// IMPORTANT: Create this user manually in your Supabase Authentication panel
const ADMIN_EMAIL_FOR_LOGIN = "admin@caminhodevenus.com"; 

const AdminLoginPage = () => {
  const [email, setEmail] = useState(''); // Changed from username to email
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { addNotification } = useNotifications();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email !== ADMIN_EMAIL_FOR_LOGIN) {
        addNotification({ type: "error", title: "Falha no Login Admin", message: "Este não é um email de administrador." });
        return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      addNotification({ type: "error", title: "Falha no Login Admin", message: error.message || "Credenciais inválidas." });
    } else if (data.user) {
      // Check if the logged-in user is the designated admin
      if (data.user.email === ADMIN_EMAIL_FOR_LOGIN) {
        localStorage.setItem('isAdminAuthenticated', JSON.stringify(true)); // Simple flag for AdminProtectedRoute
        localStorage.setItem('adminUserEmail', data.user.email); // Store admin email for AdminProtectedRoute check
        addNotification({ type: "success", title: "Login Admin", message: "Acesso concedido ao painel." });
        navigate('/admin-dashboard');
      } else {
        // Log out if not the admin email, even if login was successful for some other user
        await supabase.auth.signOut();
        addNotification({ type: "error", title: "Acesso Negado", message: "Este usuário não tem permissões de administrador." });
      }
    }
  };

  return (
    <div className="min-h-screen scroll-smooth bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 text-foreground">
      <div className="flex items-center justify-center min-h-screen px-4 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md p-8 space-y-8 bg-slate-800/70 backdrop-blur-md rounded-xl shadow-2xl border border-slate-700"
        >
          <div className="text-center">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 3 }}
              className="inline-block p-3 mb-6 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full shadow-lg"
            >
              <Shield className="w-10 h-10 text-white" />
            </motion.div>
            <h1 className="font-cinzel text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 mb-3">
              Acesso Restrito
            </h1>
            <p className="text-slate-400">
              Painel de Administração Caminho de Vênus.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-purple-400">Email Admin</Label>
              <div className="input-group">
                <Key className="input-group-icon-external h-5 w-5 text-slate-500" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@caminhodevenus.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input-field-external-icon bg-slate-700/50 border-slate-600 focus:ring-purple-500 text-slate-200 placeholder-slate-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-purple-400">Senha Admin</Label>
              <div className="relative input-group">
                <Key className="input-group-icon-external h-5 w-5 text-slate-500" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Sua chave mestra"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="input-field-external-icon pr-10 bg-slate-700/50 border-slate-600 focus:ring-purple-500 text-slate-200 placeholder-slate-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-purple-400"
                  aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
            
            <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:opacity-90 text-lg py-3 transition-opacity">
              <LogIn className="mr-2 h-5 w-5" />
              Acessar Painel
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
