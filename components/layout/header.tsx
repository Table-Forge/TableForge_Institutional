"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Smartphone, LogIn, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { KnightHeadIcon } from "@/components/ui/icons";
import { useAuth } from "@/context/auth-context";
import { toImageSource } from "@/utils/image";

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
  const [failedAvatarUrl, setFailedAvatarUrl] = useState<string | null>(null);
  const { user, isAuthenticated, openAuthModal, logout } = useAuth();

  const avatarSource = toImageSource(user?.avatarUrl);
  const hasValidAvatar = Boolean(avatarSource && failedAvatarUrl !== avatarSource);
  const displayName = user?.nickname || user?.username || "Aventureiro";
  const handleName = user?.username
    ? `@${user.username}`
    : `@${displayName.toLowerCase().replace(/\s+/g, "")}`;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#2D2D2D] bg-[#000000]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 lg:h-24 flex items-center justify-between">
        <Link href="/" className="inline-flex items-center group py-2">
          <Logo variant="split" priority />
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
          {isAuthenticated ? (
            <div className="flex items-center gap-2 pl-2">
              <Link
                href="/perfil"
                className="group flex items-center gap-2.5 rounded-lg p-1 transition-colors hover:bg-[#1E1E1E]"
                title="Meu Perfil"
              >
                <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#ff2400]/40 bg-[#ff2400]/15 text-xs font-bold text-[#faf3e0] transition-all group-hover:border-[#ff2400]/80 group-hover:ring-2 group-hover:ring-[#ff2400]/30">
                  <div className="relative h-full w-full rounded-full overflow-hidden flex items-center justify-center">
                    {hasValidAvatar ? (
                      <Image
                        src={avatarSource}
                        alt={displayName}
                        fill
                        sizes="36px"
                        unoptimized
                        onError={() => setFailedAvatarUrl(avatarSource)}
                        className="object-cover rounded-full"
                      />
                    ) : (
                      <KnightHeadIcon className="w-5 h-5 text-[#ff2400]" />
                    )}
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-[#000000] z-10" />
                </div>
                <div className="hidden lg:flex flex-col text-left">
                  <span className="text-xs font-bold text-[#faf3e0] leading-tight group-hover:text-white transition-colors truncate max-w-[130px]">
                    {displayName}
                  </span>
                  <span className="text-[10px] text-[#A1A1A1] leading-tight truncate max-w-[130px]">
                    {handleName}
                  </span>
                </div>
              </Link>
              <button
                onClick={logout}
                className="p-1.5 rounded-lg text-[#A1A1A1] hover:text-[#ff2400] hover:bg-[#1E1E1E] transition-colors ml-0.5 cursor-pointer"
                title="Sair da conta"
                aria-label="Sair da conta"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Button
              size="sm"
              variant="outline"
              onClick={() => openAuthModal("login")}
              className="flex items-center gap-1.5"
            >
              <LogIn className="w-3.5 h-3.5 text-[#ff2400]" />
              <span>Entrar</span>
            </Button>
          )}

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
            {isAuthenticated ? (
              <div className="flex items-center justify-between p-3 rounded-lg bg-[#141414] border border-[#2D2D2D]">
                <Link
                  href="/perfil"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 group flex-1 min-w-0"
                >
                  <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#ff2400]/40 bg-[#ff2400]/15 text-xs font-bold text-[#faf3e0]">
                    <div className="relative h-full w-full rounded-full overflow-hidden flex items-center justify-center">
                      {hasValidAvatar ? (
                        <Image
                          src={avatarSource}
                          alt={displayName}
                          fill
                          sizes="36px"
                          unoptimized
                          onError={() => setFailedAvatarUrl(avatarSource)}
                          className="object-cover rounded-full"
                        />
                      ) : (
                        <KnightHeadIcon className="w-5 h-5 text-[#ff2400]" />
                      )}
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-[#141414] z-10" />
                  </div>
                  <div className="flex flex-col text-left min-w-0">
                    <span className="text-xs font-bold text-[#faf3e0] group-hover:text-white transition-colors truncate">
                      {displayName}
                    </span>
                    <span className="text-[10px] text-[#A1A1A1] truncate">
                      {handleName}
                    </span>
                  </div>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 p-1.5 rounded-md hover:bg-[#1E1E1E] transition-colors cursor-pointer ml-2 shrink-0"
                  title="Sair da conta"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sair</span>
                </button>
              </div>
            ) : (
              <Button
                size="md"
                variant="outline"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openAuthModal("login");
                }}
                className="w-full flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4 text-[#ff2400]" />
                <span>Entrar na Forja</span>
              </Button>
            )}

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
