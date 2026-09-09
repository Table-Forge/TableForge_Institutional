"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Shield, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/sobre", label: "Sobre" },
  { href: "/equipe", label: "Equipe" },
  { href: "/blog", label: "Blog" },
  { href: "/taverna", label: "A Taverna" },
  { href: "/para-lojas", label: "Para Lojas & Espaços" },
];

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#2D2D2D] bg-[#000000]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Logo variant="horizontal" priority />
        </Link>

        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm px-3 py-1.5 rounded-md font-medium transition-colors ${
                  isActive
                    ? "text-[#ff2400] bg-[#ff2400]/10"
                    : "text-[#D1D1D1] hover:text-[#faf3e0] hover:bg-[#1E1E1E]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden sm:flex items-center gap-3">
          <Link href="https://tableforge.com.br" target="_blank" rel="noopener noreferrer">
            <Button size="sm" variant="outline" className="hidden lg:inline-flex">
              <Shield className="w-3.5 h-3.5" />
              Painel
            </Button>
          </Link>
          <Link href="/#baixar-app">
            <Button size="sm" variant="primary">
              <Smartphone className="w-3.5 h-3.5" />
              Baixar o App
            </Button>
          </Link>
        </div>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-[#D1D1D1] hover:text-[#faf3e0] hover:bg-[#1E1E1E]"
          aria-label="Abrir menu móvel"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-[#2D2D2D] bg-[#1E1E1E] px-4 pt-3 pb-5 space-y-2">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive
                    ? "text-[#ff2400] bg-[#ff2400]/15"
                    : "text-[#D1D1D1] hover:text-[#faf3e0] hover:bg-[#2D2D2D]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="pt-3 border-t border-[#2D2D2D] flex flex-col gap-2">
            <Link href="/#baixar-app" onClick={() => setIsMobileMenuOpen(false)}>
              <Button size="md" variant="primary" className="w-full">
                <Smartphone className="w-4 h-4" />
                Baixar o App TableForge
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
