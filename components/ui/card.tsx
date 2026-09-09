import React from "react";

export interface ICard extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "surface" | "interactive";
}

export function Card({
  variant = "default",
  children,
  className = "",
  ...props
}: ICard) {
  const variantStyles = {
    default: "bg-[#1E1E1E] border border-[#2D2D2D]",
    surface: "bg-[#2D2D2D] border border-[#3a3a3a]",
    interactive: "bg-[#1E1E1E] border border-[#2D2D2D] hover:border-[#ff2400]/40 transition-all duration-200 hover:shadow-lg hover:shadow-[#ff2400]/5",
  };

  return (
    <div
      className={`rounded-xl p-6 ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
