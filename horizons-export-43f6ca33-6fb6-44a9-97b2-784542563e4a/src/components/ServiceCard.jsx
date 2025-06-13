import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const ServiceCard = ({ title, description, price, icon: Icon, delay = 0, onSelect, pageColors = {}, serviceType }) => {
  const { primaryColor = 'hsl(var(--primary))', accentColor = 'hsl(var(--accent))', buttonGradientClass = 'mystical-gradient' } = pageColors;
  const navigate = useNavigate();

  const handleRequestConsultation = () => {
    if (onSelect && typeof onSelect === 'function') {
      onSelect(title); 
    }
    // Navigate to the new SolicitarConsultaPage with service name as a URL parameter
    navigate(`/solicitar-consulta/${encodeURIComponent(title)}?type=${serviceType}`);
  };


  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="glass-effect rounded-xl p-6 card-hover flex flex-col h-full"
    >
      <div className="flex items-center justify-between mb-4">
        <div 
          className="w-12 h-12 rounded-full flex items-center justify-center shadow-md"
          style={{ background: `linear-gradient(135deg, ${primaryColor} 0%, ${accentColor} 100%)` }}
        >
          <Icon className="w-6 h-6 text-primary-foreground" />
        </div>
        <span 
          className="text-2xl font-bold"
          style={{
            background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          R$ {price}
        </span>
      </div>
      
      <h3 
        className="font-cinzel text-xl font-semibold mb-3"
        style={{ color: primaryColor }}
      >
        {title}
      </h3>
      
      <p className="text-muted-foreground mb-6 leading-relaxed flex-grow">
        {description}
      </p>
      
      <Button 
        onClick={handleRequestConsultation}
        className={`w-full ${buttonGradientClass} hover:opacity-90 transition-opacity font-medium text-primary-foreground`}
      >
        Solicitar Consulta
      </Button>
    </motion.div>
  );
};

export default ServiceCard;