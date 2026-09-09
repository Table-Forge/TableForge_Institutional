import React from "react";
import Image from "next/image";
import { BRAND_LOGOS } from "@/constants/logos";

export interface ILogo {
  variant?: "horizontal" | "vertical" | "mark";
  className?: string;
  priority?: boolean;
}

export function Logo({ variant = "horizontal", className = "", priority = false }: ILogo) {
  if (variant === "mark") {
    return (
      <div className={`relative w-8 h-8 ${className}`}>
        <Image
          src={BRAND_LOGOS.local.markDark}
          alt="TableForge Mark"
          width={32}
          height={32}
          priority={priority}
          className="object-contain"
        />
      </div>
    );
  }

  if (variant === "vertical") {
    return (
      <div className={`relative w-36 h-28 ${className}`}>
        <Image
          src={BRAND_LOGOS.local.verticalDark}
          alt="TableForge Logo"
          width={144}
          height={112}
          priority={priority}
          className="object-contain"
        />
      </div>
    );
  }

  return (
    <div className={`relative w-36 h-9 ${className}`}>
      <Image
        src={BRAND_LOGOS.local.horizontalDark}
        alt="TableForge"
        width={144}
        height={36}
        priority={priority}
        className="object-contain"
      />
    </div>
  );
}
