import React from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";

interface IDiceFeature {
  title: string;
  description: string;
  imageSrc: string;
  tag: string;
}

const DICE_FEATURES: IDiceFeature[] = [
  {
    title: "Múltiplos dados e física tátil",
    description:
      "Selecione e role qualquer combinação de dados ao mesmo tempo (d4, d6, d8, d10, d12, d20, d100) com controles ágeis.",
    imageSrc: "/app-screens/dice-roll.png",
    tag: "Rolagem rápida",
  },
  {
    title: "Resultados com bônus e críticos",
    description:
      "Soma automática de modificadores, histórico recente de rolagens e destaque visual para sucessos ou desastres decisivos.",
    imageSrc: "/app-screens/dice-result.png",
    tag: "Cálculo instantâneo",
  },
  {
    title: "Skins e colecionáveis",
    description:
      "Personalize a aparência dos seus dados no app com temas exclusivos: obsidiana rúnica, ouro forjado, âmbar e muito mais.",
    imageSrc: "/app-screens/dice-appearance.png",
    tag: "Customização",
  },
];

export function DiceFeatureSection() {
  return (
    <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:mt-28 lg:px-8">
      <SectionHeading
        numeral="III"
        kicker="Forja de dados"
        title="A forja de dados integrada"
        description="Esqueceu seus dados em casa ou precisa de uma rolagem rápida no meio da campanha? O TableForge conta com um rolador completo nativo no app, com cálculo automático de modificadores e skins colecionáveis."
      />

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        {DICE_FEATURES.map((feature) => {
          return (
            <Card
              key={feature.title}
              variant="interactive"
              className="flex flex-col gap-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#ff5a36]">
                    {feature.tag}
                  </span>
                  <h3 className="font-display text-base font-bold uppercase tracking-[0.05em] text-[#faf3e0]">
                    {feature.title}
                  </h3>
                </div>
              </div>

              <p className="text-xs leading-relaxed text-[#A1A1A1]">
                {feature.description}
              </p>

              <div className="mx-auto mt-auto w-full max-w-[248px] chamfer-md bg-[#0b0b0d] p-2 ring-1 ring-inset ring-[#2a2a30]">
                <div className="relative aspect-[450/915] w-full overflow-hidden">
                  <Image
                    src={feature.imageSrc}
                    alt={feature.title}
                    fill
                    sizes="(max-width: 768px) 240px, 280px"
                    className="object-cover object-top"
                  />
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
