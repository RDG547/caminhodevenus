
import React from 'react';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Palette } from 'lucide-react';
import { predefinedThemes } from '@/pages/ProfilePage'; // Importar de ProfilePage

const ProfilePreferences = ({ themeColor, preferences, setPreferences, selectedThemeColor, setSelectedThemeColor }) => {
  
  const handlePreferenceChange = (prefKey) => {
    setPreferences(prev => ({ ...prev, [prefKey]: !prev[prefKey] }));
  };

  return (
    <>
      <h2 className="font-cinzel text-xl font-semibold pt-4" id="preferences" style={{
        background: `linear-gradient(135deg, ${themeColor}, hsl(var(--accent)))`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}>Preferências e Personalização</h2>
      <div className="space-y-4">
          <div className="flex items-center space-x-2">
              <Checkbox 
                id="notifications" 
                checked={preferences.notifications} 
                onCheckedChange={() => handlePreferenceChange('notifications')} 
                style={{'--tw-ring-color': themeColor, '--checkbox-checked-bg': themeColor}} 
                className="border-[var(--profile-theme-color-dynamic)] data-[state=checked]:bg-[var(--profile-theme-color-dynamic)] data-[state=checked]:border-[var(--profile-theme-color-dynamic)]" />
              <Label htmlFor="notifications" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Ativar notificações do site
              </Label>
          </div>
          <div className="space-y-2">
              <Label htmlFor="themeColorSelect" style={{ color: themeColor }}>Cor do Tema da Página de Perfil</Label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {predefinedThemes.map(theme => (
                      <Button
                          key={theme.name}
                          variant="outline"
                          onClick={() => setSelectedThemeColor(theme.color)}
                          className={`h-16 flex flex-col items-center justify-center text-xs p-1 ${selectedThemeColor === theme.color ? 'ring-2 ring-offset-2 ring-offset-background' : ''}`}
                          style={{ backgroundColor: theme.color, color: theme.color === 'hsl(0, 0%, 20%)' ? 'white' : 'black', borderColor: selectedThemeColor === theme.color ? 'var(--profile-theme-color-dynamic)' : theme.color }}
                      >
                          <Palette className="h-4 w-4 mb-1" />
                          {theme.name}
                      </Button>
                  ))}
              </div>
          </div>
      </div>
    </>
  );
};

export default ProfilePreferences;
