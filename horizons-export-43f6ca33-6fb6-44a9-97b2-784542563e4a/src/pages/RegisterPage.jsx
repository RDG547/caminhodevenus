
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserPlus, User, Mail, Lock, Eye, EyeOff, Phone, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { showNotification } from '@/components/NotificationSystem';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/;

  const formatPhoneNumber = (value) => {
    const cleaned = ('' + value).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{0,2})(\d{0,5})(\d{0,4})$/);
    if (!match) return value;
    let formatted = '';
    if (match[1]) formatted += `(${match[1]}`;
    if (match[2]) formatted += `) ${match[2]}`;
    if (match[3]) formatted += `-${match[3]}`;
    return formatted;
  };

  const handlePhoneChange = (e) => {
    setPhone(formatPhoneNumber(e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !phone || !birthDate || !password || !confirmPassword) {
      showNotification("error", "Campos incompletos", "Por favor, preencha todos os campos.");
      return;
    }
    if (!emailRegex.test(email)) {
      showNotification("error", "Email inválido", "Por favor, insira um email válido.");
      return;
    }
    if (!phoneRegex.test(phone.replace(/\D/g, ''))) {
      showNotification("error", "Telefone inválido", "Por favor, insira um telefone válido no formato (XX) XXXXX-XXXX.");
      return;
    }
    if (password !== confirmPassword) {
      showNotification("error", "Senhas não coincidem", "As senhas digitadas não são iguais.");
      return;
    }
    if (password.length < 6) {
      showNotification("error", "Senha muito curta", "A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    const success = await register(name, email, phone, birthDate, password);
    if (success) {
      navigate('/');
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
              whileHover={{ scale: 1.1, rotate: -5 }}
              className="inline-block p-3 mb-6 mystical-gradient rounded-full shadow-lg"
            >
              <UserPlus className="w-10 h-10 text-primary-foreground" />
            </motion.div>
            <h1 className="font-cinzel text-4xl font-bold text-gradient mb-3">
              Criar Conta
            </h1>
            <p className="text-muted-foreground">
              Junte-se à nossa comunidade mística.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-primary">Nome *</Label>
              <div className="input-group">
                <User className="input-group-icon-external h-5 w-5" />
                <Input
                  id="name" type="text" placeholder="Seu nome completo" value={name}
                  onChange={(e) => setName(e.target.value)} required
                  className="input-field-external-icon bg-card/80 border-input focus:ring-ring"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-primary">Email *</Label>
              <div className="input-group">
                <Mail className="input-group-icon-external h-5 w-5" />
                <Input
                  id="email" type="email" placeholder="seu@email.com" value={email}
                  onChange={(e) => setEmail(e.target.value)} required
                  className="input-field-external-icon bg-card/80 border-input focus:ring-ring"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-primary">Telefone/Celular *</Label>
              <div className="input-group">
                  <Phone className="input-group-icon-external h-5 w-5" />
                  <Input
                  id="phone" type="tel" placeholder="(XX) XXXXX-XXXX" value={phone}
                  onChange={handlePhoneChange} required maxLength="15"
                  className="input-field-external-icon bg-card/80 border-input focus:ring-ring"
                  />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="birthDate" className="text-primary">Data de Nascimento *</Label>
              <div className="input-group">
                  <CalendarDays className="input-group-icon-external h-5 w-5" />
                  <Input
                  id="birthDate" type="date" value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)} required
                  className="input-field-external-icon bg-card/80 border-input focus:ring-ring"
                  />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-primary">Senha *</Label>
              <div className="relative input-group">
                  <Lock className="input-group-icon-external h-5 w-5" />
                  <Input
                  id="password" type={showPassword ? "text" : "password"}
                  placeholder="Mín. 6 caracteres" value={password}
                  onChange={(e) => setPassword(e.target.value)} required
                  className="input-field-external-icon pr-10 bg-card/80 border-input focus:ring-ring"
                  />
                  <button
                  type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-primary"
                  aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
                  >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-primary">Confirmar Senha *</Label>
              <div className="relative input-group">
                  <Lock className="input-group-icon-external h-5 w-5" />
                  <Input
                  id="confirmPassword" type={showConfirmPassword ? "text" : "password"}
                  placeholder="Repita sua senha" value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)} required
                  className="input-field-external-icon pr-10 bg-card/80 border-input focus:ring-ring"
                  />
                  <button
                  type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-primary"
                  aria-label={showConfirmPassword ? "Esconder senha" : "Mostrar senha"}
                  >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
              </div>
            </div>
            
            <Button type="submit" className="w-full mystical-gradient text-primary-foreground hover:opacity-90 text-lg py-3">
              <UserPlus className="mr-2 h-5 w-5" />
              Registrar
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Já tem uma conta?{' '}
            <Link to="/login" className="font-medium text-accent hover:text-primary transition-colors">
              Faça login aqui
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;
