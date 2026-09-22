import React from "react";
import { KeystoneIcon } from "@/components/ui/icons";

export interface IForgeKicker {
  numeral?: string;
  children: React.ReactNode;
  className?: string;
}

export function ForgeKicker({ numeral, children, className = "" }: IForgeKicker) {
  return (
    <p
      className={`inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.35em] text-[#ff5a36] ${className}`}
    >
      <KeystoneIcon className="h-3 w-3 shrink-0 text-[#ff2400]" aria-hidden="true" />
      <span>
        {numeral ? `${numeral} · ` : ""}
        {children}
      </span>
      <span className="h-px w-10 shrink-0 bg-[#ff2400]/40" aria-hidden="true" />
    </p>
  );
}

export interface ISectionHeading {
  kicker: string;
  numeral?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  level?: "h1" | "h2";
  size?: "lg" | "md";
  align?: "left" | "center";
  action?: React.ReactNode;
  className?: string;
}

const titleSizes: Record<NonNullable<ISectionHeading["size"]>, string> = {
  lg: "text-3xl sm:text-4xl lg:text-5xl",
  md: "text-2xl sm:text-3xl lg:text-4xl",
};

export function SectionHeading({
  kicker,
  numeral,
  title,
  description,
  level = "h2",
  size = "md",
  align = "left",
  action,
  className = "",
}: ISectionHeading) {
  const Title = level;
  const centered = align === "center";

  return (
    <div
      className={`flex flex-col gap-6 ${
        centered ? "items-center text-center" : "md:flex-row md:items-end md:justify-between"
      } ${className}`}
    >
      <div className={`space-y-4 ${centered ? "max-w-3xl" : "max-w-2xl"}`}>
        <ForgeKicker numeral={numeral}>{kicker}</ForgeKicker>
        <Title
          className={`font-display font-bold uppercase leading-[1.08] tracking-[0.02em] text-[#faf3e0] ${titleSizes[size]}`}
        >
          {title}
        </Title>
        {description && <p className="text-sm leading-relaxed text-[#A1A1A1] sm:text-base">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
