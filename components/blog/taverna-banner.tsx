import React from "react";
import Link from "next/link";
import { MessageSquare, ArrowRight, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface ITavernaBanner {
  categorySlug?: string;
  categoryName?: string;
}

export function TavernaBanner({
  categorySlug = "mestres-narradores",
  categoryName = "Mestres & Narradores",
}: ITavernaBanner) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-[#ff2400]/40 bg-gradient-to-r from-[#2D2D2D] to-[#1E1E1E] p-6 lg:p-8 my-10 shadow-lg">
      <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
        <Flame className="w-48 h-48 text-[#ff2400]" />
      </div>

      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#ff2400]">
            <MessageSquare className="w-4 h-4" />
            <span>Debata este assunto n&apos;A Taverna</span>
          </div>
          <h4 className="text-lg lg:text-xl font-bold text-[#faf3e0]">
            Quer trocar experiências com outros jogadores e mestres?
          </h4>
          <p className="text-xs lg:text-sm text-[#D1D1D1] leading-relaxed">
            Nossa comunidade está debatendo este tema e compartilhando materiais exclusivos na seção de{" "}
            <strong className="text-[#faf3e0]">{categoryName}</strong>.
          </p>
        </div>

        <Link href={`/taverna/${categorySlug}`} className="shrink-0">
          <Button variant="primary" size="md">
            <span>Entrar na Discussão</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
