
import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const MobileMenu = ({ isOpen, setIsOpen, navItems, location, currentNavColors }) => {
  const { user } = useAuth();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="md:hidden absolute top-full left-0 right-0 shadow-lg"
          style={{ backgroundColor: currentNavColors.bgColor }}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path || (location.pathname.startsWith('/solicitar-consulta') && item.path.includes(new URLSearchParams(location.search).get('type')));
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(`flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium transition-all duration-300`,
                    isActive ? '' : 'hover:opacity-80'
                  )}
                  style={{
                    color: isActive ? currentNavColors.activeTextColor : currentNavColors.textColor,
                    backgroundColor: isActive ? currentNavColors.activeBgColor : 'transparent',
                  }}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            {!user && (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium transition-all duration-300 hover:opacity-80"
                  style={{ color: currentNavColors.textColor }}
                >
                  <LogIn className="w-5 h-5" />
                  <span>Login</span>
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium transition-all duration-300 hover:opacity-80"
                  style={{ color: currentNavColors.textColor }}
                >
                  <UserPlus className="w-5 h-5" />
                  <span>Registrar</span>
                </Link>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
