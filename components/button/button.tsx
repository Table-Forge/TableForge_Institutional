import React from "react";
import type { IButton, ButtonStyles } from "./button.interfaces";

function Loading() {
  return (
    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
  );
}

export const Button: React.FC<IButton> = ({
  children,
  buttonStyle,
  variant,
  size = "md",
  isLoading,
  maxWidth,
  color,
  className = "",
  disabled,
  style,
  ...props
}) => {
  const resolvedStyle: ButtonStyles =
    buttonStyle ||
    (variant === "outline"
      ? "hollow"
      : variant === "ghost"
      ? "soft"
      : (variant as ButtonStyles)) ||
    "primary";

  const baseStyles =
    "inline-flex items-center justify-center gap-2 border font-medium transition cursor-pointer disabled:cursor-not-allowed disabled:opacity-60";

  const widthStyles = maxWidth || className.includes("w-full") ? "w-full" : "w-max";
  const sizeStyles: Record<NonNullable<IButton["size"]>, string> = {
    xs: "h-7 px-2.5 text-xs rounded-md",
    sm: "h-8 px-3 text-xs rounded-md",
    md: "h-10 px-4 text-sm rounded-lg",
    lg: "h-11 px-5 text-sm font-semibold rounded-lg",
    xl: "h-12 px-6 text-base font-semibold rounded-xl",
  };

  const variants: Record<ButtonStyles, string> = {
    primary: "bg-[#ff2400] border-[#ff2400] text-white hover:brightness-110",
    secondary: "bg-[#3a3a3a] border-[#4A4A4A] text-white hover:bg-[#4A4A4A]",
    danger: "bg-red-600 border-red-600 text-white hover:brightness-110",
    hollow:
      "bg-transparent border-[#ff2400] text-[#ff2400] hover:bg-[#ff2400]/10",
    soft:
      "border-[#ff2400]/40 bg-[#ff2400]/15 text-white hover:bg-[#ff2400]/25",
    softDanger:
      "border-red-500/40 bg-red-500/10 text-red-500 hover:bg-red-500/20",
  };

  const interactionStyles =
    disabled || isLoading
      ? "cursor-not-allowed opacity-60"
      : "cursor-pointer active:scale-[0.98]";

  const hollowInlineStyle =
    resolvedStyle === "hollow"
      ? {
          borderColor: color || undefined,
          color: color || undefined,
        }
      : {};

  return (
    <button
      className={[
        baseStyles,
        widthStyles,
        sizeStyles[size],
        variants[resolvedStyle],
        interactionStyles,
        className,
      ].join(" ")}
      disabled={disabled || isLoading}
      style={{ ...style, ...hollowInlineStyle }}
      {...props}
    >
      {isLoading ? (
        <>
          <Loading />
          <span>Carregando...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};
