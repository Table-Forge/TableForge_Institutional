import React from "react";

export interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

const variantStyles: Record<NonNullable<IButton["variant"]>, string> = {
  primary: "bg-[#ff2400] text-[#faf3e0] hover:bg-[#e02000] border border-transparent shadow-md hover:shadow-[#ff2400]/20",
  secondary: "bg-[#3a3a3a] text-[#faf3e0] hover:bg-[#4a4a4a] border border-[#4a4a4a]",
  outline: "bg-transparent text-[#faf3e0] border border-[#ff2400] hover:bg-[#ff2400]/10",
  ghost: "bg-transparent text-[#faf3e0] hover:bg-[#3a3a3a] border border-transparent",
  danger: "bg-red-700 text-[#faf3e0] hover:bg-red-800 border border-transparent",
};

const sizeStyles: Record<NonNullable<IButton["size"]>, string> = {
  sm: "text-xs px-3 py-1.5 rounded-md gap-1.5",
  md: "text-sm px-4 py-2 rounded-lg gap-2",
  lg: "text-base px-6 py-3 rounded-lg gap-2.5 font-medium",
};

export const Button = React.forwardRef<HTMLButtonElement, IButton>(
  ({ variant = "primary", size = "md", isLoading = false, children, className = "", disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#ff2400]/40 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      >
        {isLoading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
