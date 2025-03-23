import * as React from 'react';

const Tabs = ({ defaultValue, ...props }) => {
  const [value, setValue] = React.useState(defaultValue);

  return (
    <div {...props} data-value={value}>
      {React.Children.map(props.children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            value,
            onValueChange: setValue,
          });
        }
        return child;
      })}
    </div>
  );
};

const TabsList = ({ className, ...props }) => (
  <div
    className={`inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground ${
      className || ''
    }`}
    {...props}
  />
);

const TabsTrigger = ({
  className,
  value,
  onValueChange,
  onClick,
  ...props
}) => {
  const handleClick = (e) => {
    if (onClick) onClick(e);
    if (onValueChange) onValueChange(value);
  };

  return (
    <button
      className={`cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm ${
        className || ''
      }`}
      onClick={handleClick}
      data-state={
        onValueChange && value === onValueChange ? 'active' : 'inactive'
      }
      {...props}
    />
  );
};

const TabsContent = ({ className, value, onValueChange, ...props }) => (
  <div
    className={`mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
      className || ''
    }`}
    hidden={onValueChange !== value}
    {...props}
  />
);

export { Tabs, TabsList, TabsTrigger, TabsContent };
