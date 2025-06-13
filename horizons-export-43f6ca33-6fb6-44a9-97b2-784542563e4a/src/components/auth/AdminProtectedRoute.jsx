
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';

const AdminProtectedRoute = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (user && JSON.parse(localStorage.getItem('isAdminAuthenticated')) && user.email === localStorage.getItem('adminUserEmail')) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
        if (user && JSON.parse(localStorage.getItem('isAdminAuthenticated'))) {
          localStorage.removeItem('isAdminAuthenticated');
          localStorage.removeItem('adminUserEmail');
        }
      }
      setLoading(false);
    };

    checkAdminStatus();
    
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      checkAdminStatus();
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };

  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen bg-background"><p className="text-foreground text-lg font-cinzel">Verificando acesso...</p></div>; 
  }

  if (!isAdmin) {
    return <Navigate to="/admin-login" replace />;
  }
  return children;
};

export default AdminProtectedRoute;
