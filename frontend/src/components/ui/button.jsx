import * as React from 'react';

const buttonVariants = {
  default:
    'bg-[#F8F5E9] text-primary hover:bg-primary hover:text-primary-foreground border border-primary',
  destructive:
    'bg-[#F8F5E9] text-destructive hover:bg-destructive hover:text-destructive-foreground border border-destructive',
  outline:
    'border border-input bg-[#F8F5E9] hover:bg-accent hover:text-accent-foreground',
  secondary:
    'bg-[#F8F5E9] text-secondary-foreground hover:bg-secondary hover:text-secondary-foreground border border-secondary',
  ghost:
    'bg-[#F8F5E9] hover:bg-accent hover:text-accent-foreground border border-transparent hover:border-accent',
  link: 'bg-transparent text-primary underline-offset-4 hover:underline border-none',
};

const buttonSizes = {
  default: 'h-10 px-4 py-2',
  sm: 'h-9 rounded-md px-3',
  lg: 'h-11 rounded-md px-8',
  icon: 'h-10 w-10',
};

const Button = React.forwardRef(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-70 cursor-pointer ${
          buttonVariants[variant]
        } ${buttonSizes[size]} ${className || ''}`}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
