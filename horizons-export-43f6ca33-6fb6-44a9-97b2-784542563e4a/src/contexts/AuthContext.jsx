import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { showNotification as displayToastNotification } from '@/components/NotificationSystem';

const AuthContext = createContext(null);
const NotificationContext = createContext(null);

const getZodiacSign = (dateString) => {
  if (!dateString) return "";
  try {
    const date = new Date(dateString + "T00:00:00Z"); 
    if (isNaN(date.getTime())) return ""; 
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1; 

    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Áries";
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Touro";
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gêmeos";
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Câncer";
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leão";
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgem";
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra";
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Escorpião";
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagitário";
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Capricórnio";
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Aquário";
    if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return "Peixes";
    return "";
  } catch (error) {
    console.error("Error parsing date for zodiac sign:", dateString, error);
    return "";
  }
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [hasUnread, setHasUnread] = useState(false);

  const addNotification = useCallback((notification) => {
    const newNotification = { ...notification, id: Date.now(), read: false, timestamp: new Date().toISOString() };
    setNotifications(prev => {
      const updated = [newNotification, ...prev.slice(0, 19)]; 
      localStorage.setItem('caminhoDeVenusNotifications', JSON.stringify(updated));
      setHasUnread(true);
      return updated;
    });
    displayToastNotification(notification.type || 'info', notification.title, notification.message);
  }, []);

  useEffect(() => {
    const storedNotifications = localStorage.getItem('caminhoDeVenusNotifications');
    if (storedNotifications) {
      try {
        const parsedNotifications = JSON.parse(storedNotifications);
        setNotifications(parsedNotifications);
        setHasUnread(parsedNotifications.some(n => !n.read));
      } catch (e) {
        console.error("Failed to parse notifications from localStorage", e);
        localStorage.removeItem('caminhoDeVenusNotifications');
      }
    }
  }, []);

  const markAsRead = useCallback((id) => {
    setNotifications(prev => {
      const updated = prev.map(n => n.id === id ? { ...n, read: true } : n);
      localStorage.setItem('caminhoDeVenusNotifications', JSON.stringify(updated));
      setHasUnread(updated.some(n => !n.read));
      return updated;
    });
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => {
      const updated = prev.map(n => ({ ...n, read: true }));
      localStorage.setItem('caminhoDeVenusNotifications', JSON.stringify(updated));
      setHasUnread(false);
      return updated;
    });
  }, []);
  
  const clearNotifications = useCallback(() => {
    setNotifications([]);
    localStorage.removeItem('caminhoDeVenusNotifications');
    setHasUnread(false);
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, markAsRead, markAllAsRead, hasUnread, clearNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addNotification } = useNotifications();

  const fetchUserProfile = useCallback(async (userId) => {
    if (!userId) return null;
    try {
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      if (profileError && profileError.code !== 'PGRST116') { 
        console.error(`Error fetching profile for user ${userId}:`, profileError.message);
        return null; 
      }
      return profile;
    } catch (error) {
      console.error(`Exception fetching profile for user ${userId}:`, error);
      return null;
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    const setSessionUser = async (session) => {
      if (session?.user) {
        const profile = await fetchUserProfile(session.user.id);
        setUser({ ...session.user, profile: profile || {} });
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    supabase.auth.getSession().then(({ data: { session }, error }) => {
       if (error && error.message.includes('Invalid Refresh Token')) {
        addNotification?.({ type: 'warn', title: 'Sessão Expirada', message: 'Sua sessão expirou. Por favor, faça login novamente.' });
        supabase.auth.signOut();
        setSessionUser(null);
       } else {
        setSessionUser(session);
       }
    }).catch(error => {
      console.error("Error in initial getSession:", error);
      setLoading(false); 
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (_event === 'TOKEN_REFRESHED' && !session) {
        addNotification?.({ type: 'warn', title: 'Sessão Expirada', message: 'Sua sessão expirou. Por favor, faça login novamente.' });
      }
      await setSessionUser(session);
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, [fetchUserProfile, addNotification]);


  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      addNotification?.({ type: "error", title: "Erro no Login", message: error.message || "Email ou senha inválidos." });
      return false;
    }
    return !!data.user;
  };

  const register = async (name, email, phone, birthDate, password) => {
    const cleanedPhone = phone ? phone.replace(/\D/g, '') : null;
    const userMetaData = { 
      name, 
      phone: cleanedPhone,
      birth_date: birthDate || null, 
      avatar_url: `https://avatar.vercel.sh/${email}.png?default=identicon`,
      theme_color: 'hsl(300, 60%, 55%)', 
      notifications_enabled: true,
    };
    if (birthDate) {
      userMetaData.zodiac_sign = getZodiacSign(birthDate);
    } else {
      userMetaData.zodiac_sign = null;
    }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: userMetaData }
    });
    if (error) {
      addNotification?.({ type: "error", title: "Erro no Registro", message: error.message || "Não foi possível registrar." });
      return false;
    }
    return !!data.user;
  };

  const logout = async () => {
    const userName = user?.profile?.name || user?.email || 'usuário';
    const { error } = await supabase.auth.signOut();
    if (error) {
      addNotification?.({ type: "error", title: "Erro no Logout", message: error.message });
    } else {
      addNotification?.({ type: "info", title: "Logout", message: `Até breve, ${userName}!` });
    }
  };
  
  const updateUser = async (updatedData) => {
    if (!user) return false;
    
    const { email: newEmail, password: newPassword, avatarFile, ...profileData } = updatedData;
    let newAvatarUrl = profileData.avatarUrl;

    if (avatarFile) {
        const fileExt = avatarFile.name.split('.').pop();
        const fileName = `${user.id}_${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;
        const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, avatarFile, { upsert: true });

        if (uploadError) {
            addNotification?.({ type: 'error', title: 'Erro de Upload', message: uploadError.message });
            return false;
        }

        const { data: urlData } = supabase.storage.from('avatars').getPublicUrl(filePath);
        newAvatarUrl = urlData.publicUrl;
    }

    if (newEmail && newEmail !== user.email) {
      const { error: emailError } = await supabase.auth.updateUser({ email: newEmail });
      if (emailError) {
        addNotification?.({ type: 'error', title: 'Erro ao Atualizar Email', message: emailError.message });
        return false;
      }
      addNotification?.({ type: 'info', title: 'Confirmação Necessária', message: 'Verifique seu novo e antigo email para confirmar a alteração.' });
    }
    
    if (newPassword) {
      const { error: passwordError } = await supabase.auth.updateUser({ password: newPassword });
      if (passwordError) {
        addNotification?.({ type: "error", title: "Erro ao Atualizar Senha", message: passwordError.message });
        return false;
      }
    }

    const { preferences, ...coreProfileData } = profileData;
    const profileUpdates = {
      ...coreProfileData,
      avatar_url: newAvatarUrl,
      theme_color: preferences?.themeColor,
      notifications_enabled: preferences?.notifications,
      updated_at: new Date().toISOString(),
    };
    if (profileData.birth_date) {
      profileUpdates.zodiac_sign = getZodiacSign(profileData.birth_date);
    }
    
    const { error: profileError } = await supabase.from('profiles').update(profileUpdates).eq('id', user.id);
    if (profileError) {
      addNotification?.({ type: "error", title: "Erro ao Atualizar Perfil", message: profileError.message });
      return false;
    }

    const { data: refreshedUser } = await supabase.auth.getUser();
    if (refreshedUser?.user) {
        const refreshedProfile = await fetchUserProfile(refreshedUser.user.id);
        setUser({ ...refreshedUser.user, profile: refreshedProfile || user.profile }); 
    }

    addNotification?.({ type: "success", title: "Perfil Atualizado", message: "Suas informações foram salvas." });
    return true;
  };

  const deleteAccount = async () => {
    if (!user) return false;
    const { error: functionError } = await supabase.functions.invoke('delete-user-account-secure');
    if (functionError) {
      addNotification?.({ type: "error", title: "Erro ao Excluir Conta", message: functionError.message || "Não foi possível processar a exclusão." });
      return false;
    }
    addNotification?.({ type: "success", title: "Conta Excluída", message: "Sua conta foi excluída permanentemente." });
    return true; 
  };


  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register, updateUser, deleteAccount, addNotification }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  return context;
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    return {
        notifications: [],
        addNotification: () => {},
        markAsRead: () => {},
        markAllAsRead: () => {},
        hasUnread: false,
        clearNotifications: () => {}
    };
  }
  return context;
};