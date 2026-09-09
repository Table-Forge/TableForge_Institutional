"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";

export interface IModal {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl";
}

const maxWidthStyles = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
};

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "md",
}: IModal) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={`relative w-full ${maxWidthStyles[maxWidth]} bg-[#1E1E1E] border border-[#3a3a3a] rounded-xl shadow-2xl p-6 text-[#faf3e0] z-10 max-h-[90vh] overflow-y-auto`}
      >
        <div className="flex items-center justify-between pb-4 border-b border-[#2D2D2D] mb-4">
          <h3 className="text-lg font-semibold text-[#faf3e0]">{title}</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#A1A1A1] hover:text-[#faf3e0] hover:bg-[#2D2D2D] transition-colors"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
