import React from "react";
import { KeystoneIcon } from "@/components/ui/icons";

export interface IForgeDivider {
  label?: string;
  className?: string;
}

export function ForgeDivider({ label, className = "" }: IForgeDivider) {
  return (
    <div role="separator" className={`flex items-center gap-4 ${className}`}>
      <span className="h-px flex-1 bg-[#2D2D2D]" />
      <span className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#717171]">
        <KeystoneIcon className="h-3 w-3 text-[#ff2400]/80" aria-hidden="true" />
        {label}
      </span>
      <span className="h-px flex-1 bg-[#2D2D2D]" />
    </div>
  );
}
