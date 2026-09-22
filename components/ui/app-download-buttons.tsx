import React from "react";
import { AppleIcon, GooglePlayIcon } from "@/components/ui/icons";

export interface IAppDownloadButtons {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function AppDownloadButtons({ className = "", size = "md" }: IAppDownloadButtons) {
  const isSmall = size === "sm";

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <a
        href="https://play.google.com/store"
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-3 bg-[#1E1E1E] hover:bg-[#2D2D2D] border border-[#3a3a3a] hover:border-[#ff2400]/50 chamfer-sm transition-all duration-200 text-[#faf3e0] shadow-md hover:shadow-[#ff2400]/10 ${
          isSmall ? "px-3 py-1.5" : "px-4 py-2.5"
        }`}
      >
        <GooglePlayIcon className={isSmall ? "w-5 h-5 text-[#ff2400]" : "w-6 h-6 text-[#ff2400]"} />
        <div className="flex flex-col text-left">
          <span className="text-[10px] text-[#A1A1A1] uppercase tracking-wider font-semibold leading-none">
            Disponível no
          </span>
          <span className={`font-bold leading-tight ${isSmall ? "text-xs" : "text-sm"}`}>
            Google Play
          </span>
        </div>
      </a>

      <a
        href="https://www.apple.com/app-store/"
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-3 bg-[#1E1E1E] hover:bg-[#2D2D2D] border border-[#3a3a3a] hover:border-[#ff2400]/50 chamfer-sm transition-all duration-200 text-[#faf3e0] shadow-md hover:shadow-[#ff2400]/10 ${
          isSmall ? "px-3 py-1.5" : "px-4 py-2.5"
        }`}
      >
        <AppleIcon className={isSmall ? "w-5 h-5 text-[#faf3e0]" : "w-6 h-6 text-[#faf3e0]"} />
        <div className="flex flex-col text-left">
          <span className="text-[10px] text-[#A1A1A1] uppercase tracking-wider font-semibold leading-none">
            Baixar na
          </span>
          <span className={`font-bold leading-tight ${isSmall ? "text-xs" : "text-sm"}`}>
            App Store
          </span>
        </div>
      </a>
    </div>
  );
}
