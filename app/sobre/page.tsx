import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { ForgeBand } from "@/components/ui/forge-band";
import { ForgeDivider } from "@/components/ui/forge-divider";
import { AnvilSpot, CompassSpot, MugSpot, StoreSignSpot } from "@/components/ui/spot-art";

export const metadata: Metadata = {
  title: "Sobre a Forja | Manifesto & Missão",
  description: "Conheça a história, missão e o manifesto do TableForge: unindo a comunidade brasileira de RPG, board games e TCG.",
};

const PILLARS = [
  {
    numeral: "I",
    title: "Encontre por geolocalização",
    description:
      "Defina seu bairro e raio de busca. Encontre parceiros de party, mestres procurando jogadores e eventos a poucos quilômetros de você.",
    Spot: CompassSpot,
  },
  {
    numeral: "II",
    title: "A Taverna permanente",
    description:
      "Um fórum comunitário indexável onde dúvidas de regras, guias de Sessão Zero e dicas narrativas ficam arquivados para sempre, gerando valor contínuo no Google.",
    Spot: MugSpot,
  },
  {
    numeral: "III",
    title: "Valorização dos espaços físicos",
    description:
      "Lojas geek e taberneiros locais ganham visibilidade direta no mapa para que seus horários livres sejam preenchidos por jogadores reais.",
    Spot: StoreSignSpot,
  },
  {
    numeral: "IV",
    title: "Feito por quem joga",
    description:
      "Nosso time é composto por mestres e entusiastas que vivem o hobby há décadas. Cada detalhe da interface é pensado com carinho para quem rola dados.",
    Spot: AnvilSpot,
  },
];

export default function SobrePage() {
  return (
    <div className="pb-20">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <SectionHeading
          level="h1"
          size="lg"
          align="center"
          kicker="Manifesto TableForge"
          title="O ponto de encontro do RPG de mesa"
          description="Nascemos da dor real de quem vive RPG no Brasil e passa mais tempo tentando reunir o grupo do que de fato rolando dados."
        />
      </div>

      <ForgeBand>
        <div className="mx-auto max-w-3xl space-y-6 text-sm leading-relaxed text-[#D1D1D1] sm:text-base">
          <h2 className="font-display text-2xl font-bold uppercase tracking-[0.03em] text-[#faf3e0]">
            Por que criamos o TableForge?
          </h2>
          <p>
            Durante anos, organizar uma campanha de RPG ou encontrar um grupo de board games significou a mesma rotina exaustiva: mandar mensagens em grupos abandonados em redes sociais convencionais, criar mais um canal de chat temporário com dezenas de notificações silenciadas, perder fichas de personagens em pastas desorganizadas e torcer para que os jogadores confirmem presença.
          </p>
          <p>
            Pior ainda: quem se muda de cidade ou quer experimentar mesas presenciais fica completamente à deriva. As lojas físicas possuem mesas vazias durante a semana, enquanto dezenas de jogadores na mesma região não sabem onde jogar nem com quem se conectar.
          </p>
          <blockquote className="border-l-2 border-[#ff2400] pl-5 font-semibold italic text-[#faf3e0]">
            O TableForge foi criado para que você encontre sua party diretamente pelo aplicativo móvel através de geolocalização, reservando mesas e conectando pessoas reais. A Taverna complementa essa experiência como o arquivo permanente de conhecimento da nossa comunidade.
          </blockquote>
        </div>
      </ForgeBand>

      <section className="mx-auto mt-20 max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeading kicker="Nossos pilares" title="Os quatro alicerces da comunidade" align="center" />

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
          {PILLARS.map(({ numeral, title, description, Spot }) => (
            <Card key={title} className="flex gap-5">
              <Spot className="h-20 w-20 shrink-0" />
              <div className="space-y-2">
                <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#ff5a36]">Alicerce {numeral}</span>
                <h3 className="font-display text-base font-bold uppercase tracking-[0.05em] text-[#faf3e0]">{title}</h3>
                <p className="text-xs leading-relaxed text-[#A1A1A1]">{description}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-4xl px-4 sm:px-6 lg:px-8">
        <ForgeDivider label="Junte-se à forja" />
        <div className="mt-8 flex flex-col items-center gap-4 text-center">
          <h3 className="font-display text-xl font-bold uppercase tracking-[0.04em] text-[#faf3e0]">
            Quer fazer parte da construção do TableForge?
          </h3>
          <p className="max-w-md text-xs leading-relaxed text-[#A1A1A1]">
            Entre na Taverna para sugerir melhorias ou conheça a equipe por trás da plataforma.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link href="/taverna">
              <Button variant="primary" size="md">
                <span>Acessar A Taverna</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/equipe">
              <Button variant="outline" size="md">
                Conhecer a equipe
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
