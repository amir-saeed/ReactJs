import React from 'react';
import { ButtonProps } from '../../types';

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  type = 'button',
  className = '',
  onClick,
  href
}) => {
  const baseClasses = `btn btn--${variant} btn--${size === 'large' ? 'large' : size === 'small' ? 'small' : ''}`;
  const classes = className ? `${baseClasses} ${className}` : baseClasses;

  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;