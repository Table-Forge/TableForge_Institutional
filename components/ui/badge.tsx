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
  primary: "bg-[#ff2400]/20 text-[#ff2400] border border-[#ff2400]/40",
  secondary: "bg-[#3a3a3a] text-[#faf3e0] border border-[#4a4a4a]",
  outline: "bg-transparent text-[#D1D1D1] border border-[#4A4A4A]",
  danger: "bg-red-950/60 text-red-400 border border-red-800/40",
};

export function Badge({
  variant = "default",
  tavernaBadge,
  size = "sm",
  children,
  className = "",
  ...props
}: IBadge) {
  const sizeClasses = size === "sm" ? "text-xs px-2.5 py-0.5" : "text-sm px-3 py-1";

  if (tavernaBadge) {
    switch (tavernaBadge) {
      case "FerreiroFundador":
        return (
          <span
            className={`inline-flex items-center gap-1 rounded-full font-medium bg-amber-950/50 text-amber-300 border border-amber-500/40 shadow-sm ${sizeClasses} ${className}`}
            title="Ferreiro Fundador: Membro apoiador dos primeiros dias da Forja"
            {...props}
          >
            <Hammer className="w-3 h-3 text-amber-400" />
            <span>Ferreiro Fundador</span>
          </span>
        );
      case "MestreDaForja":
        return (
          <span
            className={`inline-flex items-center gap-1 rounded-full font-medium bg-purple-950/50 text-purple-300 border border-purple-500/40 shadow-sm ${sizeClasses} ${className}`}
            title="Mestre da Forja: Narrador experiente e ativo na comunidade"
            {...props}
          >
            <Sparkles className="w-3 h-3 text-purple-400" />
            <span>Mestre da Forja</span>
          </span>
        );
      case "ParceiroFundador":
        return (
          <span
            className={`inline-flex items-center gap-1 rounded-full font-medium bg-[#ff2400]/15 text-[#ff5a36] border border-[#ff2400]/50 shadow-sm ${sizeClasses} ${className}`}
            title="Parceiro Fundador: Espaço geek ou loja credenciada"
            {...props}
          >
            <Shield className="w-3 h-3 text-[#ff2400]" />
            <span>Parceiro Fundador</span>
          </span>
        );
      case "CriadorDaForja":
        return (
          <span
            className={`inline-flex items-center gap-1 rounded-full font-medium bg-cyan-950/50 text-cyan-300 border border-cyan-500/40 shadow-sm ${sizeClasses} ${className}`}
            title="Criador da Forja: Produtor de conteúdo parceiro"
            {...props}
          >
            <Video className="w-3 h-3 text-cyan-400" />
            <span>Criador da Forja</span>
          </span>
        );
      case "Moderador":
        return (
          <span
            className={`inline-flex items-center gap-1 rounded-full font-medium bg-red-950/60 text-red-300 border border-red-600/50 shadow-sm ${sizeClasses} ${className}`}
            title="Moderador da Taverna"
            {...props}
          >
            <Flame className="w-3 h-3 text-[#ff2400]" />
            <span>Moderador</span>
          </span>
        );
    }
  }

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-medium ${badgeVariants[variant]} ${sizeClasses} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
