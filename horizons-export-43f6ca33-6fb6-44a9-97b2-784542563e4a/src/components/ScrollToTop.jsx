import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [buttonColor, setButtonColor] = useState('mystical-gradient');

  const pageColorsMap = {
    '/tarot': 'tarot-page-button-gradient',
    '/astrologia': 'astrologia-page-button-gradient',
    '/baralho-cigano': 'baralho-cigano-page-button-gradient',
    // Add other pages and their specific gradient classes if needed
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const newColor = pageColorsMap[pathname] || 'mystical-gradient';
    setButtonColor(newColor);
  }, [pathname]);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <Button
            onClick={scrollToTop}
            size="icon"
            className={`${buttonColor} hover:opacity-90 transition-opacity rounded-full shadow-lg`}
            aria-label="Voltar ao topo"
          >
            <ArrowUp className="h-6 w-6 text-primary-foreground" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;