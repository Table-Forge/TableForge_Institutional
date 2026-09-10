import React from "react";
import Image from "next/image";
import { Sparkles, Dices, Award, Palette } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface IDiceFeature {
  title: string;
  description: string;
  imageSrc: string;
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
}

const DICE_FEATURES: IDiceFeature[] = [
  {
    title: "Múltiplos Dados & Física Tátil",
    description:
      "Selecione e role qualquer combinação de dados ao mesmo tempo (d4, d6, d8, d10, d12, d20, d100) com controles ágeis.",
    imageSrc: "/app-screens/dice-roll.png",
    icon: Dices,
    tag: "Rolagem Rápida",
  },
  {
    title: "Resultados com Bônus e Críticos",
    description:
      "Soma automática de modificadores, histórico recente de rolagens e destaque visual para sucessos ou desastres decisivos.",
    imageSrc: "/app-screens/dice-result.png",
    icon: Award,
    tag: "Cálculo Instantâneo",
  },
  {
    title: "Skins & Colecionáveis",
    description:
      "Personalize a aparência dos seus dados no app com temas exclusivos: obsidiana rúnica, ouro forjado, âmbar e muito mais.",
    imageSrc: "/app-screens/dice-appearance.png",
    icon: Palette,
    tag: "Customização",
  },
];

export function DiceFeatureSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-xl border border-[#ff2400]/40 bg-gradient-to-b from-[#1E1E1E] via-[#121212] to-[#0A0A0A] p-8 sm:p-12 lg:p-16 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff2400]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12 sm:mb-16 relative z-10">
          <Badge variant="primary" className="mx-auto">
            <Sparkles className="w-3.5 h-3.5 text-[#ff2400]" />
            <span>Hidden Feature do Aplicativo</span>
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#faf3e0] tracking-tight">
            A Forja de Dados Integrada
          </h2>
          <p className="text-sm sm:text-base text-[#D1D1D1] leading-relaxed">
            Esqueceu seus dados em casa ou precisa de uma rolagem rápida no meio da campanha? O TableForge conta com um rolador completo de dados nativo no app, com cálculo automático de modificadores e skins colecionáveis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {DICE_FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group rounded-xl bg-[#171717] border border-[#2D2D2D] hover:border-[#ff2400]/50 transition-all duration-300 p-5 flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-lg bg-[#ff2400]/15 flex items-center justify-center text-[#ff2400]">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-semibold text-[#ff2400] bg-[#ff2400]/10 px-2.5 py-0.5 rounded-full border border-[#ff2400]/20">
                      {feature.tag}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[#faf3e0] group-hover:text-white transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-[#A1A1A1] leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div className="relative w-full max-w-[240px] mx-auto aspect-[450/915] rounded-xl overflow-hidden border border-[#2D2D2D] bg-[#0A0A0A] shadow-lg group-hover:shadow-[#ff2400]/10 transition-shadow">
                  <Image
                    src={feature.imageSrc}
                    alt={feature.title}
                    fill
                    sizes="(max-width: 768px) 240px, 280px"
                    className="object-cover object-top"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
