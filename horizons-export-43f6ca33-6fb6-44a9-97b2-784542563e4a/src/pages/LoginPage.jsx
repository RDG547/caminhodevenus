
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { showNotification } from '@/components/NotificationSystem';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      showNotification("error", "Campos incompletos", "Por favor, preencha email e senha.");
      return;
    }
    
    const success = await login(email, password); 
    if (success) {
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="min-h-screen scroll-smooth bg-gradient-to-br from-background via-purple-900/40 to-background text-foreground">
      <div className="flex items-center justify-center min-h-screen px-4 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md p-8 space-y-8 glass-effect rounded-xl shadow-2xl"
        >
          <div className="text-center">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="inline-block p-3 mb-6 mystical-gradient rounded-full shadow-lg"
            >
              <LogIn className="w-10 h-10 text-primary-foreground" />
            </motion.div>
            <h1 className="font-cinzel text-4xl font-bold text-gradient mb-3">
              Login
            </h1>
            <p className="text-muted-foreground">
              Acesse sua conta para continuar sua jornada.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-primary">Email</Label> 
              <div className="input-group">
                <Mail className="input-group-icon-external h-5 w-5" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input-field-external-icon bg-card/80 border-input focus:ring-ring"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-primary">Senha</Label>
              <div className="relative input-group">
                <Lock className="input-group-icon-external h-5 w-5" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Sua senha secreta"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="input-field-external-icon pr-10 bg-card/80 border-input focus:ring-ring"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-primary"
                  aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
            
            <Button type="submit" className="w-full mystical-gradient text-primary-foreground hover:opacity-90 text-lg py-3">
              <LogIn className="mr-2 h-5 w-5" />
              Entrar
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Não tem uma conta?{' '}
            <Link to="/register" className="font-medium text-accent hover:text-primary transition-colors">
              Registre-se aqui
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
