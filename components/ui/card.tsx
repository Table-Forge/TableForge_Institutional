import React from "react";

export interface ICard extends React.HTMLAttributes<HTMLDivElement> {
  padding?: "none" | "sm" | "md";
}

const surfaceStyles: Record<NonNullable<ICard["variant"]>, string> = {
  default: "bg-[#121214]",
  surface: "bg-[#18181c]",
  interactive: "bg-[#121214]",
};

const paddingStyles: Record<NonNullable<ICard["padding"]>, string> = {
  none: "p-0",
  sm: "p-4",
  md: "p-5 sm:p-6",
};

const bracketStyles =
  "before:pointer-events-none before:absolute before:bottom-2 before:left-2 before:h-3 before:w-3 before:border-b before:border-l before:border-[#faf3e0]/20 before:transition-colors after:pointer-events-none after:absolute after:right-2 after:top-2 after:h-3 after:w-3 after:border-r after:border-t after:border-[#faf3e0]/20 after:transition-colors";

export function Card({
  variant = "default",
  padding = "md",
  children,
  className = "",
  ...props
}: ICard) {
  const interactiveStyles =
    variant === "interactive"
      ? "group-hover:before:border-[#ff5a36] group-hover:after:border-[#ff5a36]"
      : "";

  return (
    <div className={`group chamfer-md h-full p-px `} {...props}>
      <div
        className={`chamfer-md relative h-full ${surfaceStyles[variant]} ${paddingStyles[padding]} ${bracketStyles} ${interactiveStyles} ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
