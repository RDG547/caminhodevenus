import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster as SonnerToaster } from 'sonner';
import HomePage from '@/pages/HomePage';
import TarotPage from '@/pages/TarotPage';
import AstrologiaPage from '@/pages/AstrologiaPage';
import BaralhoCiganoPage from '@/pages/BaralhoCiganoPage';
import SobrePage from '@/pages/SobrePage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import ProfilePage from '@/pages/ProfilePage';
import ScrollToTop from '@/components/ScrollToTop';
import { AuthProvider, NotificationProvider, useAuth } from '@/contexts/AuthContext';
import Navigation from '@/components/Navigation';
import AdminLoginPage from '@/pages/AdminLoginPage';
import AdminDashboardPage from '@/pages/AdminDashboardPage';
import SolicitarConsultaPage from '@/pages/SolicitarConsultaPage';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import AdminProtectedRoute from '@/components/auth/AdminProtectedRoute';

const AppContent = () => {
  const { loading: authLoading } = useAuth();

  if (authLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-background via-purple-900/30 to-background">
        <div className="star-field"></div>
        <p className="text-foreground text-xl font-cinzel">Desvendando os Astros...</p>
      </div>
    );
  }

  return (
    <>
      <ScrollToTop />
      <Navigation />
      <main className="flex-grow pt-20">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tarot" element={<TarotPage />} />
          <Route path="/astrologia" element={<AstrologiaPage />} />
          <Route path="/baralho-cigano" element={<BaralhoCiganoPage />} />
          <Route path="/sobre" element={<SobrePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route 
            path="/perfil" 
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/solicitar-consulta/:serviceName" 
            element={
              <ProtectedRoute>
                <SolicitarConsultaPage />
              </ProtectedRoute>
            } 
          />
          
          <Route path="/admin-login" element={<AdminLoginPage />} />
          <Route 
            path="/admin-dashboard/*" 
            element={
              <AdminProtectedRoute>
                <AdminDashboardPage />
              </AdminProtectedRoute>
            } 
          />
        </Routes>
      </main>
      <SonnerToaster richColors position="top-right" />
    </>
  );
};


function App() {
  return (
    <Router>
      <NotificationProvider>
        <AuthProvider>
            <AppContent />
        </AuthProvider>
      </NotificationProvider>
    </Router>
  );
}

export default App;