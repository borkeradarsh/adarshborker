import React, { useState, useCallback, memo } from 'react';
import { scheduleWork } from '../utils/performance';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void | Promise<void>;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  loading?: boolean;
  debounceMs?: number;
}

const Button: React.FC<ButtonProps> = memo(({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  disabled = false,
  type = 'button',
  loading = false,
  debounceMs = 300
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastClickTime, setLastClickTime] = useState(0);

  const handleClick = useCallback(async () => {
    if (!onClick || disabled || loading || isProcessing) return;
    
    // Debounce rapid clicks
    const now = Date.now();
    if (now - lastClickTime < debounceMs) return;
    setLastClickTime(now);

    setIsProcessing(true);
    try {
      await onClick();
      
      // Schedule any non-critical post-click work during idle time
      scheduleWork(() => {
        // Analytics or other non-critical operations can go here
        // Button interaction tracking can be added here
      });
    } catch (error) {
      console.error('Button onClick error:', error);
    } finally {
      setIsProcessing(false);
    }
  }, [onClick, disabled, loading, isProcessing, lastClickTime, debounceMs, variant, size]);
  const isButtonDisabled = disabled || loading || isProcessing;
  
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 relative';
  
  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 disabled:bg-blue-400',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500 disabled:bg-gray-400',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white focus:ring-blue-500 disabled:border-blue-400 disabled:text-blue-400'
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };
  
  const finalClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className} ${isButtonDisabled ? 'cursor-not-allowed opacity-70' : ''}`;
  
  return (
    <button
      type={type}
      className={finalClasses}
      onClick={handleClick}
      disabled={isButtonDisabled}
      aria-label={loading || isProcessing ? 'Processing...' : undefined}
    >
      {(loading || isProcessing) && (
        <svg 
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;