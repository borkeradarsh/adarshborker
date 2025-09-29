import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'bordered' | 'elevated';
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'default'
}) => {
  const baseClasses = 'rounded-lg overflow-hidden';
  
  const variantClasses = {
    default: 'bg-white/10 backdrop-blur-sm',
    bordered: 'bg-white/5 backdrop-blur-sm border border-white/20',
    elevated: 'bg-white/10 backdrop-blur-sm shadow-lg'
  };
  
  const finalClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;
  
  return (
    <div className={finalClasses}>
      {children}
    </div>
  );
};

export default Card;