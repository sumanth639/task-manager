import * as React from 'react';

const badgeVariants = {
  default: 'bg-primary text-primary-foreground hover:bg-primary/80',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  outline:
    'text-foreground border border-input hover:bg-accent hover:text-accent-foreground',
  high: 'bg-red-100 text-red-800 hover:bg-red-200',
  medium: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
  low: 'bg-green-100 text-green-800 hover:bg-green-200',
};

const Badge = ({ className, variant = 'default', ...props }) => {
  return (
    <div
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
        badgeVariants[variant]
      } ${className || ''}`}
      {...props}
    />
  );
};

export { Badge, badgeVariants };
