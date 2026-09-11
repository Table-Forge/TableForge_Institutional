import React from "react";
import Image from "next/image";
import { BRAND_LOGOS } from "@/constants/logos";

export interface ILogo {
  variant?: "horizontal" | "vertical" | "mark" | "split";
  className?: string;
  priority?: boolean;
}

export function Logo({ variant = "horizontal", className = "", priority = false }: ILogo) {
  if (variant === "split") {
    return (
      <div className={`inline-flex items-center gap-1.5 sm:gap-2 ${className}`}>
        <div className="relative h-11 w-11 sm:h-14 sm:w-14 shrink-0">
          <Image
            src={BRAND_LOGOS.local.markDark}
            alt="TableForge Mark"
            fill
            sizes="(max-width: 640px) 44px, 56px"
            priority={priority}
            className="object-contain"
          />
        </div>
        <div className="relative h-6 w-28 sm:h-8 sm:w-36 shrink-0">
          <Image
            src={BRAND_LOGOS.local.textDark}
            alt="TableForge"
            fill
            sizes="(max-width: 640px) 112px, 144px"
            priority={priority}
            className="object-contain"
          />
        </div>
      </div>
    );
  }
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
