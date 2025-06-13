
import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, CalendarDays, Edit3, Save, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';

const ProfileForm = ({ user, onSave, isEditing, setIsEditing, themeColor }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [newAvatarFile, setNewAvatarFile] = useState(null);
  const [bio, setBio] = useState('');
  const [birthDate, setBirthDate] = useState('');

  const { addNotification } = useAuth();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/;

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setPhone(user.phone ? formatPhoneNumber(user.phone) : '');
      setAvatarUrl(user.avatarUrl || `https://avatar.vercel.sh/${user.email}.png`);
      setBio(user.bio || '');
      setBirthDate(user.birthDate || '');
    }
  }, [user]);

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

  const getInitials = (nameStr) => {
    if (!nameStr) return "CV";
    const names = nameStr.split(' ');
    if (names.length === 1) return names[0].substring(0, 2).toUpperCase();
    return names[0][0].toUpperCase() + names[names.length - 1][0].toUpperCase();
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        setAvatarUrl(event.target.result);
        setNewAvatarFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim()) {
      addNotification({type: "error", title: "Erro", message: "Nome, email e telefone são obrigatórios."});
      return;
    }
    if (!emailRegex.test(email)) {
      addNotification({type: "error", title: "Erro", message: "Por favor, insira um email válido."});
      return;
    }
    if (!phoneRegex.test(phone)) {
      addNotification({type: "error", title: "Erro", message: "Por favor, insira um telefone válido (ex: (XX) XXXXX-XXXX)."});
      return;
    }
    
    onSave({ name, email, phone: phone.replace(/\D/g, ''), avatarUrl, bio, birthDate });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Reset fields to original user data
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setPhone(user.phone ? formatPhoneNumber(user.phone) : '');
      setAvatarUrl(user.avatarUrl || `https://avatar.vercel.sh/${user.email}.png`);
      setBio(user.bio || '');
      setBirthDate(user.birthDate || '');
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6">
      <div className="text-center relative">
        <div className="relative inline-block mb-4 group">
          <Avatar className="h-32 w-32 md:h-40 md:w-40 border-4 shadow-lg" style={{ borderColor: themeColor }}>
            <AvatarImage src={avatarUrl} alt={name} />
            <AvatarFallback className="text-4xl bg-muted text-muted-foreground">{getInitials(name)}</AvatarFallback>
          </Avatar>
          {isEditing && (
            <label htmlFor="avatarUpload" className="absolute -bottom-2 -right-2 p-2 text-accent-foreground rounded-full cursor-pointer hover:opacity-80 transition-opacity" style={{ backgroundColor: themeColor }}>
              <ImageIcon className="h-5 w-5" />
              <input id="avatarUpload" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            </label>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name" style={{ color: themeColor }}>Nome *</Label>
          <div className="input-group">
            <User className="input-group-icon-external h-5 w-5" />
            <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} disabled={!isEditing} className="input-field-external-icon bg-card/80 border-input focus:ring-[var(--profile-theme-color-dynamic)] disabled:opacity-70" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" style={{ color: themeColor }}>Email *</Label>
          <div className="input-group">
            <Mail className="input-group-icon-external h-5 w-5" />
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={!isEditing} className="input-field-external-icon bg-card/80 border-input focus:ring-[var(--profile-theme-color-dynamic)] disabled:opacity-70" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone" style={{ color: themeColor }}>Telefone *</Label>
          <div className="input-group">
            <Phone className="input-group-icon-external h-5 w-5" />
            <Input id="phone" type="tel" placeholder="(XX) XXXXX-XXXX" value={phone} onChange={handlePhoneChange} disabled={!isEditing} className="input-field-external-icon bg-card/80 border-input focus:ring-[var(--profile-theme-color-dynamic)] disabled:opacity-70" maxLength="15" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="birthDate" style={{ color: themeColor }}>Data de Nascimento</Label>
          <div className="input-group">
            <CalendarDays className="input-group-icon-external h-5 w-5" />
            <Input id="birthDate" type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} disabled={!isEditing} className="input-field-external-icon bg-card/80 border-input focus:ring-[var(--profile-theme-color-dynamic)] disabled:opacity-70" />
          </div>
        </div>
      </div>
      
      {isEditing && (
        <div className="space-y-2">
          <Label htmlFor="bio" style={{ color: themeColor }}>Mini Bio</Label>
          <Textarea id="bio" placeholder="Conte um pouco sobre você..." value={bio} onChange={(e) => setBio(e.target.value)} className="bg-card/80 border-input focus:ring-[var(--profile-theme-color-dynamic)]" />
        </div>
      )}
      
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        {isEditing ? (
          <>
            <Button type="submit" className="w-full sm:w-auto flex-1 text-primary-foreground hover:opacity-90 text-lg py-3" style={{ background: `linear-gradient(135deg, ${themeColor} 0%, hsl(var(--accent)) 100%)`}}>
              <Save className="mr-2 h-5 w-5" />
              Salvar Alterações
            </Button>
            <Button type="button" variant="outline" onClick={handleCancelEdit} className="w-full sm:w-auto flex-1 border-[var(--profile-theme-color-dynamic)] text-[var(--profile-theme-color-dynamic)] hover:bg-[var(--profile-theme-color-dynamic)]/10 text-lg py-3">
              Cancelar Edição
            </Button>
          </>
        ) : (
          <Button type="button" onClick={() => setIsEditing(true)} className="w-full sm:w-auto flex-1 text-primary-foreground hover:opacity-90 text-lg py-3" style={{ background: `linear-gradient(135deg, ${themeColor} 0%, hsl(var(--accent)) 100%)`}}>
            <Edit3 className="mr-2 h-5 w-5" />
            Editar Perfil
          </Button>
        )}
      </div>
    </form>
  );
};

export default ProfileForm;
