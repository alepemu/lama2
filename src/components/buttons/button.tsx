import * as React from "react";

import cn from "../../utils/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <button
        className={cn(
          className,
          "border-2 border-white/25 px-3 py-0.5 rounded-xl"
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

export default Button;
