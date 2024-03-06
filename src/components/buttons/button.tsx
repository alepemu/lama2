import * as React from "react";

import cn from "../../utils/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className = "", disabled = false, ...props }, ref) => {
    return (
      <button
        disabled={disabled}
        className={cn(className, 'border border-white px-2 rounded-full')}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

export default Button;
