import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  // Pill shaped, gentle tracking, premium feel
  const baseStyles = "inline-flex items-center justify-center px-8 py-4 text-base font-bold transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 tracking-wide uppercase font-sans text-sm";
  
  const variants = {
    primary: "bg-brand-primary text-brand-light hover:bg-[#B88E8A] hover:-translate-y-0.5 shadow-lg hover:shadow-xl focus:ring-brand-primary",
    secondary: "bg-brand-dark text-white hover:bg-brand-primary focus:ring-gray-700",
    outline: "bg-transparent border-2 border-brand-dark text-brand-dark hover:bg-brand-accent hover:border-brand-accent hover:text-white"
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;