
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Lock, Eye, EyeOff } from 'lucide-react';

const ProfileSecurity = ({ themeColor, onPasswordChange }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  React.useEffect(() => {
    // Passa os dados de senha para o ProfilePage quando eles mudam
    onPasswordChange({ newPassword, confirmNewPassword });
  }, [newPassword, confirmNewPassword, onPasswordChange]);

  return (
    <>
      <h2 className="font-cinzel text-xl font-semibold pt-4" id="security" style={{
        background: `linear-gradient(135deg, ${themeColor}, hsl(var(--accent)))`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}>Alterar Senha (Opcional)</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="newPassword" style={{ color: themeColor }}>Nova Senha</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input id="newPassword" type={showNewPassword ? "text" : "password"} placeholder="Nova senha (mín. 6 caracteres)" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="pl-10 pr-10 bg-card/80 border-input focus:ring-[var(--profile-theme-color-dynamic)]" />
            <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-[var(--profile-theme-color-dynamic)]">
              {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmNewPassword" style={{ color: themeColor }}>Confirmar Nova Senha</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input id="confirmNewPassword" type={showConfirmNewPassword ? "text" : "password"} placeholder="Confirme a nova senha" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} className="pl-10 pr-10 bg-card/80 border-input focus:ring-[var(--profile-theme-color-dynamic)]" />
              <button type="button" onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-[var(--profile-theme-color-dynamic)]">
              {showConfirmNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileSecurity;
