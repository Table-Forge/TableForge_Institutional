import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ForgeKicker } from "@/components/ui/section-heading";
import { MugSpot } from "@/components/ui/spot-art";

export interface ITavernaBanner {
  categorySlug?: string;
  categoryName?: string;
}

export function TavernaBanner({
  categorySlug = "mestres-narradores",
  categoryName = "Mestres & Narradores",
}: ITavernaBanner) {
  return (
    <Card className="my-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between lg:p-8">
      <div className="flex items-start gap-5">
        <MugSpot className="h-16 w-16 shrink-0" />
        <div className="space-y-2">
          <ForgeKicker>Debata este assunto n&apos;A Taverna</ForgeKicker>
          <h4 className="font-display text-lg font-bold uppercase tracking-[0.03em] text-[#faf3e0]">
            Quer trocar experiências com outros jogadores e mestres?
          </h4>
          <p className="text-xs leading-relaxed text-[#D1D1D1] lg:text-sm">
            Nossa comunidade está debatendo este tema e compartilhando materiais exclusivos na seção de{" "}
            <strong className="text-[#faf3e0]">{categoryName}</strong>.
          </p>
        </div>
      </div>

      <Link href={`/taverna/${categorySlug}`} className="shrink-0">
        <Button variant="primary" size="md">
          <span>Entrar na discussão</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </Link>
    </Card>
  );
}
