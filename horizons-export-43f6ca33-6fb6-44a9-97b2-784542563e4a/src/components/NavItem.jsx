
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const NavItem = ({ item, isActive, currentNavColors }) => {
  const Icon = item.icon;
  return (
    <Link
      to={item.path}
      className={cn(
        `relative flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 group`,
        isActive ? `shadow-inner` : `hover:opacity-80`
      )}
      style={{
        color: isActive ? currentNavColors.activeTextColor : currentNavColors.textColor,
        backgroundColor: isActive ? currentNavColors.activeBgColor : 'transparent',
      }}
    >
      <Icon
        className={`w-5 h-5`}
        style={{ color: isActive ? currentNavColors.activeTextColor : currentNavColors.textColor }}
      />
      <span>{item.name}</span>
      {isActive && (
        <motion.div
          layoutId="active-nav-item-desktop"
          className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full"
          style={{ backgroundColor: currentNavColors.accentColor }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      )}
    </Link>
  );
};

export default NavItem;
