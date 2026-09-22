import React from "react";
import { TTavernaBadge } from "@/schemas/taverna.schema";
import { Shield, Sparkles, Hammer, Video, Flame } from "lucide-react";

export interface IBadge extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "primary" | "secondary" | "outline" | "danger";
  tavernaBadge?: TTavernaBadge;
  size?: "sm" | "md";
}

const badgeVariants: Record<NonNullable<IBadge["variant"]>, string> = {
  default: "bg-[#2D2D2D] text-[#D1D1D1] border border-[#4A4A4A]",
  primary: "bg-[#ff2400]/15 text-[#ff5a36] border border-[#ff2400]/50",
  secondary: "bg-[#3a3a3a] text-[#faf3e0] border border-[#4a4a4a]",
  outline: "bg-transparent text-[#D1D1D1] border border-[#4A4A4A]",
  danger: "bg-red-950/60 text-red-400 border border-red-800/40",
};

const baseStyles = "inline-flex items-center gap-1.5 chamfer-sm font-semibold uppercase tracking-[0.16em]";
const sealStyles = "shadow-[inset_0_1px_0_rgba(255,255,255,0.14),inset_0_-1px_0_rgba(0,0,0,0.45)]";

interface ITavernaSeal {
  label: string;
  title: string;
  styles: string;
  icon: React.ReactNode;
}

const tavernaSeals: Record<TTavernaBadge, ITavernaSeal> = {
  FerreiroFundador: {
    label: "Ferreiro Fundador",
    title: "Ferreiro Fundador: Membro apoiador dos primeiros dias da Forja",
    styles: "bg-amber-950/50 text-amber-300 border border-amber-500/40",
    icon: <Hammer className="h-3 w-3 text-amber-400" />,
  },
  MestreDaForja: {
    label: "Mestre da Forja",
    title: "Mestre da Forja: Narrador experiente e ativo na comunidade",
    styles: "bg-purple-950/50 text-purple-300 border border-purple-500/40",
    icon: <Sparkles className="h-3 w-3 text-purple-400" />,
  },
  ParceiroFundador: {
    label: "Parceiro Fundador",
    title: "Parceiro Fundador: Espaço geek ou loja credenciada",
    styles: "bg-[#ff2400]/15 text-[#ff5a36] border border-[#ff2400]/50",
    icon: <Shield className="h-3 w-3 text-[#ff2400]" />,
  },
  CriadorDaForja: {
    label: "Criador da Forja",
    title: "Criador da Forja: Produtor de conteúdo parceiro",
    styles: "bg-cyan-950/50 text-cyan-300 border border-cyan-500/40",
    icon: <Video className="h-3 w-3 text-cyan-400" />,
  },
  Moderador: {
    label: "Moderador",
    title: "Moderador da Taverna",
    styles: "bg-red-950/60 text-red-300 border border-red-600/50",
    icon: <Flame className="h-3 w-3 text-[#ff2400]" />,
  },
};

export function Badge({
  variant = "default",
  tavernaBadge,
  size = "sm",
  children,
  className = "",
  ...props
}: IBadge) {
  const sizeClasses = size === "sm" ? "text-[10px] px-2.5 py-1" : "text-[11px] px-3 py-1.5";

  if (tavernaBadge) {
    const seal = tavernaSeals[tavernaBadge];
    return (
      <span
        className={`${baseStyles} ${sealStyles} ${seal.styles} ${sizeClasses} ${className}`}
        title={seal.title}
        {...props}
      >
        {seal.icon}
        <span>{seal.label}</span>
      </span>
    );
  }

  return (
    <span className={`${baseStyles} ${badgeVariants[variant]} ${sizeClasses} ${className}`} {...props}>
      {children}
    </span>
  );
}
