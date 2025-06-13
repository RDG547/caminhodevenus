import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Moon, Sun, Sparkles, Layers2, Users as UsersIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import NavAuthControls from '@/components/NavAuthControls';
import NavItem from '@/components/NavItem';
import MobileMenu from '@/components/MobileMenu';

const navItemsList = [
  { name: 'Início', path: '/', icon: Sparkles, colors: { bgColor: 'hsl(var(--nav-background))', primaryColor: 'hsl(var(--primary))', accentColor: 'hsl(var(--accent))', textColor: 'hsl(var(--foreground))', activeTextColor: 'hsl(var(--primary-foreground))', activeBgColor: 'hsl(var(--primary))', logoTextColor: 'hsl(var(--primary))'} },
  { name: 'Tarot', path: '/tarot', icon: Moon, colors: { bgColor: 'hsl(var(--tarot-page-bg-start))', primaryColor: 'hsl(var(--tarot-page-primary))', accentColor: 'hsl(var(--tarot-page-accent))', textColor: 'hsl(var(--primary-foreground))', activeTextColor: 'hsl(var(--background))', activeBgColor: 'hsl(var(--tarot-page-primary))', logoTextColor: 'hsl(var(--tarot-page-primary))'} },
  { name: 'Astrologia', path: '/astrologia', icon: Sun, colors: { bgColor: 'hsl(var(--astrologia-page-bg-start))', primaryColor: 'hsl(var(--astrologia-page-primary))', accentColor: 'hsl(var(--astrologia-page-accent))', textColor: 'hsl(var(--primary-foreground))', activeTextColor: 'hsl(var(--background))', activeBgColor: 'hsl(var(--astrologia-page-primary))', logoTextColor: 'hsl(var(--astrologia-page-primary))'} },
  { name: 'Baralho Cigano', path: '/baralho-cigano', icon: Layers2, colors: { bgColor: 'hsl(var(--baralho-cigano-page-bg-start))', primaryColor: 'hsl(var(--baralho-cigano-page-primary))', accentColor: 'hsl(var(--baralho-cigano-page-accent))', textColor: 'hsl(var(--primary-foreground))', activeTextColor: 'hsl(var(--background))', activeBgColor: 'hsl(var(--baralho-cigano-page-primary))', logoTextColor: 'hsl(var(--baralho-cigano-page-primary))'} },
  { name: 'Sobre Nós', path: '/sobre', icon: UsersIcon, colors: { bgColor: 'hsl(var(--nav-background))', primaryColor: 'hsl(var(--primary))', accentColor: 'hsl(var(--accent))', textColor: 'hsl(var(--foreground))', activeTextColor: 'hsl(var(--primary-foreground))', activeBgColor: 'hsl(var(--primary))', logoTextColor: 'hsl(var(--primary))'} },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  const [currentNavColors, setCurrentNavColors] = useState(navItemsList[0].colors);

  useEffect(() => {
    let activeItem = navItemsList.find(item => location.pathname === item.path);
    if (!activeItem && location.pathname === '/') { 
        activeItem = navItemsList.find(item => item.path === '/');
    } else if (!activeItem) {
        activeItem = navItemsList.find(item => location.pathname.startsWith(item.path) && item.path !== '/');
    }
    
    if (location.pathname.startsWith('/solicitar-consulta')) {
        const serviceType = new URLSearchParams(location.search).get('type');
        const serviceNavItem = navItemsList.find(item => item.path.split('/')[1] === serviceType);
        if (serviceNavItem && serviceNavItem.colors) {
          setCurrentNavColors(serviceNavItem.colors);
        } else {
          setCurrentNavColors(navItemsList[0].colors); 
        }
    } else if (location.pathname.startsWith('/perfil') && user?.profile?.theme_color) {
        setCurrentNavColors({
            bgColor: 'hsl(var(--nav-background))', 
            primaryColor: user.profile.theme_color,
            accentColor: user.profile.theme_color, 
            textColor: 'hsl(var(--foreground))',
            activeTextColor: 'hsl(var(--primary-foreground))',
            activeBgColor: user.profile.theme_color,
            logoTextColor: user.profile.theme_color,
        });
    } else if (activeItem && activeItem.colors) {
      setCurrentNavColors(activeItem.colors);
    } else {
      setCurrentNavColors(navItemsList[0].colors); 
    }
  }, [location.pathname, user]);


  return (
    <motion.nav 
      className="fixed top-0 w-full z-50 shadow-lg"
      animate={{ backgroundColor: currentNavColors.bgColor }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3">
            <motion.div
              whileHover={{ rotateY: 180, scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className="w-10 h-10 rounded-full flex items-center justify-center shadow-md"
              style={{ background: `linear-gradient(135deg, ${currentNavColors.primaryColor} 0%, ${currentNavColors.accentColor} 100%)`}}
            >
              <Sparkles className="w-6 h-6 text-primary-foreground" />
            </motion.div>
            <span className="font-cinzel text-2xl font-bold" style={{ color: currentNavColors.logoTextColor }}>
              Caminho de Vênus
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            {navItemsList.map((item) => (
              <NavItem 
                key={item.path}
                item={item}
                isActive={location.pathname === item.path || (location.pathname.startsWith('/solicitar-consulta') && item.path.includes(new URLSearchParams(location.search).get('type')))}
                currentNavColors={currentNavColors}
              />
            ))}
            <NavAuthControls currentNavColors={currentNavColors} />
          </div>

          <div className="md:hidden flex items-center">
             <NavAuthControls currentNavColors={currentNavColors} isMobile={true} setIsOpen={setIsOpen} />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              style={{ color: currentNavColors.textColor }}
              className="focus:ring-2 ml-2" 
            >
              {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </Button>
          </div>
        </div>
      </div>

      <MobileMenu 
        isOpen={isOpen} 
        setIsOpen={setIsOpen} 
        navItems={navItemsList} 
        location={location} 
        currentNavColors={currentNavColors}
      />
    </motion.nav>
  );
};

export default Navigation;