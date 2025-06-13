import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';
import { useAuth, useNotifications } from '@/contexts/AuthContext';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Trash2, Lock, Eye, EyeOff, ShieldAlert, Edit3, Save, Palette, User, Mail, Phone, CalendarDays, Image as ImageIcon } from 'lucide-react';

export const predefinedThemes = [
  { name: 'Padrão (Roxo Místico)', color: 'hsl(300, 60%, 55%)' },
  { name: 'Vermelho Tarot', color: 'hsl(0, 70%, 55%)' },
  { name: 'Azul Astrologia', color: 'hsl(260, 70%, 60%)' },
  { name: 'Verde Cigano', color: 'hsl(120, 60%, 45%)' },
  { name: 'Dourado Solar', color: 'hsl(45, 100%, 50%)' },
  { name: 'Prata Lunar', color: 'hsl(210, 15%, 75%)' },
  { name: 'Rosa Quartzo', color: 'hsl(330, 70%, 70%)' },
  { name: 'Ametista Profundo', color: 'hsl(270, 50%, 40%)' },
  { name: 'Esmeralda Intuitiva', color: 'hsl(145, 65%, 40%)' },
  { name: 'Lápis Lazúli', color: 'hsl(220, 60%, 50%)' },
  { name: 'Citrino Radiante', color: 'hsl(50, 90%, 55%)' },
  { name: 'Obsidiana Protetora', color: 'hsl(0, 0%, 20%)' },
];

const ADMIN_EMAIL = 'admin@caminhodevenus.com';

const formatPhoneNumber = (value) => {
    if (!value) return '';
    const cleaned = ('' + value).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{0,2})(\d{0,5})(\d{0,4})$/);
    if (!match) return value;
    let formatted = '';
    if (match[1]) formatted += `(${match[1]}`;
    if (match[2]) formatted += `) ${match[2]}`;
    if (match[3]) formatted += `-${match[3]}`;
    return formatted;
};

const ProfilePage = () => {
  const { user, updateUser, deleteAccount, loading: authLoading } = useAuth();
  const { addNotification } = useNotifications();
  const navigate = useNavigate();
  const location = useLocation();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [themeColor, setThemeColor] = useState(predefinedThemes[0].color);

  const [isConfirmSaveModalOpen, setConfirmSaveModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [passwordForDelete, setPasswordForDelete] = useState('');
  const [showPasswordForDelete, setShowPasswordForDelete] = useState(false);
  
  const resetState = useCallback(() => {
    if (user && user.profile) {
        const userTheme = user.profile.theme_color || predefinedThemes[0].color;
        setThemeColor(userTheme);
        document.documentElement.style.setProperty('--profile-theme-color-dynamic', userTheme);
        setFormData({
            name: user.profile.name || '',
            email: user.email || '',
            phone: user.profile.phone ? formatPhoneNumber(user.profile.phone) : '',
            birthDate: user.profile.birth_date || '',
            bio: user.profile.bio || '',
            avatarUrl: user.profile.avatar_url || `https://avatar.vercel.sh/${user.email}.png`,
            avatarFile: null,
            newPassword: '',
            confirmNewPassword: '',
            preferences: {
              themeColor: userTheme,
              notifications: user.profile.notifications_enabled !== false,
            }
        });
    }
  }, [user]);
  
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    } else if (user) {
      resetState();
    }
  }, [user, authLoading, navigate, resetState]);

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location.hash]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const handlePreferencesChange = (field, value) => {
    setFormData(prev => ({ ...prev, preferences: { ...prev.preferences, [field]: value } }));
    if (field === 'themeColor') {
        setThemeColor(value);
        document.documentElement.style.setProperty('--profile-theme-color-dynamic', value);
    }
  };

  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        handleInputChange('avatarUrl', event.target.result);
        handleInputChange('avatarFile', file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInitiateSave = (e) => {
    e.preventDefault();
    if (formData.newPassword && formData.newPassword !== formData.confirmNewPassword) {
      addNotification({ type: 'error', title: 'Senhas não coincidem', message: 'A nova senha e a confirmação não são iguais.' });
      return;
    }
    if (formData.newPassword && formData.newPassword.length < 6) {
        addNotification({ type: 'error', title: 'Senha muito curta', message: 'A nova senha deve ter pelo menos 6 caracteres.' });
        return;
    }
    setConfirmSaveModalOpen(true);
  };
  
  const handleFinalSave = async () => {
    if (!currentPassword) {
      addNotification({ type: 'error', title: 'Senha necessária', message: 'Por favor, insira sua senha atual para confirmar.' });
      return;
    }
    
    const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: currentPassword,
    });
    
    if (signInError) {
        addNotification({ type: 'error', title: 'Autenticação Falhou', message: 'A senha atual está incorreta.' });
        setCurrentPassword('');
        return;
    }
    
    const { phone, newPassword, confirmNewPassword, ...dataToUpdate } = formData;
    const success = await updateUser({
        ...dataToUpdate,
        phone: phone ? phone.replace(/\D/g, '') : '',
        password: newPassword || undefined
    });

    if (success) {
      setIsEditing(false);
    }

    setConfirmSaveModalOpen(false);
    setCurrentPassword('');
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    resetState();
  };

  const handleInitiateDelete = () => {
    if (user?.email === ADMIN_EMAIL) {
      addNotification({ type: "error", title: "Ação não permitida", message: "A conta de administrador não pode ser excluída." });
      return;
    }
    setDeleteModalOpen(true);
  };
  
  const handleFinalDelete = async () => {
    if (!passwordForDelete) {
        addNotification({ type: 'error', title: 'Senha necessária', message: 'Por favor, insira sua senha para confirmar a exclusão.' });
        return;
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: passwordForDelete,
    });

    if (signInError) {
        addNotification({ type: 'error', title: 'Autenticação Falhou', message: 'A senha está incorreta. A conta não foi excluída.' });
        setPasswordForDelete('');
        return;
    }
    
    const success = await deleteAccount();
    if(success) {
      navigate('/');
    }
    
    setDeleteModalOpen(false);
    setPasswordForDelete('');
  };
  
  if (authLoading || !user || !formData.email) {
    return <div className="flex justify-center items-center h-screen bg-background"><p className="text-foreground font-cinzel">Carregando perfil...</p></div>;
  }

  const pageStyle = {
    '--profile-theme-color-dynamic': themeColor,
    background: `linear-gradient(135deg, ${themeColor} -20%, hsl(var(--background)) 30%)`
  };

  const getInitials = (nameStr) => {
    if (!nameStr) return "CV";
    const names = nameStr.split(' ');
    if (names.length === 1) return names[0].substring(0, 2).toUpperCase();
    return names[0][0].toUpperCase() + names[names.length - 1][0].toUpperCase();
  };

  return (
    <div className="min-h-screen scroll-smooth text-foreground pt-5" style={pageStyle}>
      <div className="container mx-auto px-4 pb-12 pt-10 md:pt-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-3xl mx-auto p-6 md:p-8 space-y-6 glass-effect rounded-xl shadow-2xl"
        >
        <form onSubmit={handleInitiateSave}>
            <div className="text-center relative">
              <div className="relative inline-block mb-4 group">
                <Avatar className="h-32 w-32 md:h-40 md:w-40 border-4 shadow-lg" style={{ borderColor: themeColor }}>
                  <AvatarImage src={formData.avatarUrl} alt={formData.name} />
                  <AvatarFallback className="text-4xl bg-muted text-muted-foreground">{getInitials(formData.name)}</AvatarFallback>
                </Avatar>
                {isEditing && (
                  <label htmlFor="avatarUpload" className="absolute -bottom-2 -right-2 p-2 text-accent-foreground rounded-full cursor-pointer hover:opacity-80 transition-opacity" style={{ backgroundColor: themeColor }}>
                    <ImageIcon className="h-5 w-5" />
                    <input id="avatarUpload" type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                  </label>
                )}
              </div>
              <h1 className="font-cinzel text-3xl font-bold" style={{ color: themeColor }}>{formData.name}</h1>
              <p className="text-muted-foreground">{formData.email}</p>
            </div>

            <div className="pt-4 mt-4 border-t border-border/50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" style={{ color: themeColor }}>Nome *</Label>
                  <div className="input-group"><User className="input-group-icon-external h-5 w-5" /><Input id="name" type="text" value={formData.name} onChange={(e) => handleInputChange('name', e.target.value)} disabled={!isEditing} className="input-field-external-icon bg-card/80 border-input focus:ring-[var(--profile-theme-color-dynamic)] disabled:opacity-70" /></div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" style={{ color: themeColor }}>Email *</Label>
                  <div className="input-group"><Mail className="input-group-icon-external h-5 w-5" /><Input id="email" type="email" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} disabled={!isEditing} className="input-field-external-icon bg-card/80 border-input focus:ring-[var(--profile-theme-color-dynamic)] disabled:opacity-70" /></div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" style={{ color: themeColor }}>Telefone *</Label>
                  <div className="input-group"><Phone className="input-group-icon-external h-5 w-5" /><Input id="phone" type="tel" placeholder="(XX) XXXXX-XXXX" value={formData.phone} onChange={(e) => handleInputChange('phone', formatPhoneNumber(e.target.value))} disabled={!isEditing} className="input-field-external-icon bg-card/80 border-input focus:ring-[var(--profile-theme-color-dynamic)] disabled:opacity-70" maxLength="15" /></div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birthDate" style={{ color: themeColor }}>Data de Nascimento</Label>
                  <div className="input-group"><CalendarDays className="input-group-icon-external h-5 w-5" /><Input id="birthDate" type="date" value={formData.birthDate} onChange={(e) => handleInputChange('birthDate', e.target.value)} disabled={!isEditing} className="input-field-external-icon bg-card/80 border-input focus:ring-[var(--profile-theme-color-dynamic)] disabled:opacity-70" /></div>
                </div>
              </div>
              {isEditing ? (
                <>
                <div className="space-y-2 mt-6">
                    <Label htmlFor="bio" style={{ color: themeColor }}>Mini Bio</Label>
                    <Textarea id="bio" placeholder="Conte um pouco sobre você..." value={formData.bio} onChange={(e) => handleInputChange('bio', e.target.value)} className="bg-card/80 border-input focus:ring-[var(--profile-theme-color-dynamic)]" />
                </div>

                <div className="space-y-6 pt-6 border-t border-border/50 mt-6">
                    <h2 className="font-cinzel text-xl font-semibold pt-4" id="security" style={{background: `linear-gradient(135deg, ${themeColor}, hsl(var(--accent)))`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Alterar Senha (Opcional)</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="newPassword" style={{ color: themeColor }}>Nova Senha</Label>
                          <div className="relative"><Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" /><Input id="newPassword" type={showCurrentPassword ? "text" : "password"} placeholder="Nova senha (mín. 6 caracteres)" value={formData.newPassword} onChange={(e) => handleInputChange('newPassword', e.target.value)} className="pl-10 pr-10 bg-card/80 border-input focus:ring-[var(--profile-theme-color-dynamic)]" /><button type="button" onClick={() => setShowCurrentPassword(!showCurrentPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-[var(--profile-theme-color-dynamic)]">{showCurrentPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}</button></div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirmNewPassword" style={{ color: themeColor }}>Confirmar Nova Senha</Label>
                          <div className="relative"><Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" /><Input id="confirmNewPassword" type={showPasswordForDelete ? "text" : "password"} placeholder="Confirme a nova senha" value={formData.confirmNewPassword} onChange={(e) => handleInputChange('confirmNewPassword', e.target.value)} className="pl-10 pr-10 bg-card/80 border-input focus:ring-[var(--profile-theme-color-dynamic)]" /><button type="button" onClick={() => setShowPasswordForDelete(!showPasswordForDelete)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-[var(--profile-theme-color-dynamic)]">{showPasswordForDelete ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}</button></div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6 pt-6 border-t border-border/50 mt-6">
                    <h2 className="font-cinzel text-xl font-semibold pt-4" id="preferences" style={{background: `linear-gradient(135deg, ${themeColor}, hsl(var(--accent)))`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Preferências e Personalização</h2>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="notifications" checked={formData.preferences.notifications} onCheckedChange={(checked) => handlePreferencesChange('notifications', checked)} style={{'--tw-ring-color': themeColor, '--checkbox-checked-bg': themeColor}} className="border-[var(--profile-theme-color-dynamic)] data-[state=checked]:bg-[var(--profile-theme-color-dynamic)] data-[state=checked]:border-[var(--profile-theme-color-dynamic)]" />
                        <Label htmlFor="notifications">Ativar notificações do site</Label>
                    </div>
                    <div className="space-y-2">
                        <Label style={{ color: themeColor }}>Cor do Tema da Página de Perfil</Label>
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                            {predefinedThemes.map(theme => (
                                <Button key={theme.name} type="button" variant="outline" onClick={() => handlePreferencesChange('themeColor', theme.color)} className={`h-16 flex flex-col items-center justify-center text-xs p-1 ${formData.preferences.themeColor === theme.color ? 'ring-2 ring-offset-2 ring-offset-background' : ''}`} style={{ backgroundColor: theme.color, color: theme.color === 'hsl(0, 0%, 20%)' ? 'white' : 'black', borderColor: formData.preferences.themeColor === theme.color ? 'var(--profile-theme-color-dynamic)' : theme.color }}>
                                    <Palette className="h-4 w-4 mb-1" />{theme.name}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-border/50 mt-8">
                    <Button type="submit" className="w-full sm:w-auto flex-1 text-primary-foreground hover:opacity-90 text-lg py-3" style={{ background: `linear-gradient(135deg, ${themeColor} 0%, hsl(var(--accent)) 100%)`}}><Save className="mr-2 h-5 w-5" />Salvar Alterações</Button>
                    <Button type="button" variant="outline" onClick={handleCancelEdit} className="w-full sm:w-auto flex-1 border-[var(--profile-theme-color-dynamic)] text-[var(--profile-theme-color-dynamic)] hover:bg-[var(--profile-theme-color-dynamic)]/10 text-lg py-3">Cancelar Edição</Button>
                </div>
                </>
              ) : (
                <div className="pt-6 border-t border-border/50 flex flex-col sm:flex-row gap-4">
                  <Button onClick={() => setIsEditing(true)} className="w-full sm:w-auto flex-1 text-primary-foreground hover:opacity-90 text-lg py-3" style={{ background: `linear-gradient(135deg, ${themeColor} 0%, hsl(var(--accent)) 100%)`}}><Edit3 className="mr-2 h-5 w-5" />Editar Perfil</Button>
                  <Button onClick={handleInitiateDelete} variant="destructive" className="w-full sm:w-auto" disabled={user?.email === ADMIN_EMAIL}><Trash2 className="mr-2 h-5 w-5" />Excluir Conta</Button>
                </div>
              )}
            </div>
          </form>
        </motion.div>
      </div>

      <AlertDialog open={isConfirmSaveModalOpen} onOpenChange={setConfirmSaveModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-cinzel flex items-center" style={{ color: themeColor }}><ShieldAlert className="mr-2 h-6 w-6"/>Confirmar Alterações</AlertDialogTitle>
            <AlertDialogDescription>Para sua segurança, por favor, insira sua senha atual para salvar as alterações.</AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-2">
            <Label htmlFor="current-password-save" style={{ color: themeColor }}>Senha Atual *</Label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="current-password-save" type={showCurrentPassword ? "text" : "password"} value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="pl-10 pr-10" />
              <button type="button" onClick={() => setShowCurrentPassword(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setCurrentPassword('')}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleFinalSave} style={{ backgroundColor: themeColor }}>Confirmar e Salvar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={isDeleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-cinzel text-destructive flex items-center"><Trash2 className="mr-2 h-6 w-6"/>Excluir Conta</AlertDialogTitle>
            <AlertDialogDescription>Esta ação é irreversível. Tem certeza que deseja excluir sua conta? Insira sua senha para confirmar.</AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-2">
            <Label htmlFor="current-password-delete" className="text-destructive">Senha Atual *</Label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="current-password-delete" type={showPasswordForDelete ? "text" : "password"} value={passwordForDelete} onChange={(e) => setPasswordForDelete(e.target.value)} className="pl-10 pr-10 focus:ring-destructive" />
               <button type="button" onClick={() => setShowPasswordForDelete(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                {showPasswordForDelete ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setPasswordForDelete('')}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleFinalDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Confirmar Exclusão</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ProfilePage;