import React, { type ButtonHTMLAttributes, type CSSProperties, type ReactNode } from "react";

export interface IButtonIconProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  color?: string;
  hasHoverEffect?: boolean;
  isActive?: boolean;
  isHighlighted?: boolean;
  isNew?: boolean;
  size?: string;
}

export function ButtonIcon({
  children,
  className = "",
  color,
  disabled,
  hasHoverEffect = false,
  isActive = false,
  isHighlighted = false,
  isNew = false,
  size = "32px",
  style,
  type = "button",
  ...props
}: IButtonIconProps) {
  const sizeStyle: CSSProperties = {
    width: size,
    height: size,
    ...style,
  };

  const colorStyle =
    !isActive && color
      ? {
          color,
        }
      : {};

  return (
    <button
      type={type}
      disabled={disabled}
      className={[
        "relative inline-flex shrink-0 items-center justify-center overflow-visible rounded-xl border-0 bg-transparent transition",
        isActive ? "text-[#ff2400]" : "text-[#A1A1A1]",
        isHighlighted ? "bg-white/10" : "",
        hasHoverEffect
          ? "p-1 hover:bg-white/10 hover:text-[#ff2400]"
          : "hover:opacity-100",
        disabled
          ? "cursor-not-allowed opacity-50"
          : "cursor-pointer opacity-90 active:scale-95",
        isNew ? "border border-[#ff2400] bg-[#ff2400]/10" : "",
        className,
      ].join(" ")}
      style={{
        ...sizeStyle,
        ...colorStyle,
      }}
      {...props}
    >
      {children}

      {isNew ? (
        <span className="pointer-events-none absolute -right-2 -top-1.5 inline-flex h-[13px] min-w-[22px] items-center justify-center rounded-full bg-[#ff2400] px-1 text-[8px] font-bold uppercase leading-none text-white shadow">
          Novo
        </span>
      ) : null}
    </button>
  );
}
