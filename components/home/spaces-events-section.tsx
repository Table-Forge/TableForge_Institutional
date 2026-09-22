import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { KeystoneIcon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { HornSpot, MugSpot } from "@/components/ui/spot-art";

const SPACE_HIGHLIGHTS = [
  "Espaços verificados pela curadoria TableForge",
  "Filtro por raio de distância e disponibilidade em tempo real",
  "Integração direta com o chat da campanha",
];

const EVENT_HIGHLIGHTS = [
  "Confirmação de presença e vagas atualizadas ao vivo",
  "Notificações automáticas quando novos eventos surgem por perto",
  "Calendário integrado às suas campanhas no app",
];

interface IHighlightList {
  items: string[];
}

function HighlightList({ items }: IHighlightList) {
  return (
    <ul className="space-y-2 pt-2 text-xs text-[#A1A1A1]">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-2">
          <KeystoneIcon className="h-3 w-3 shrink-0 text-[#ff2400]" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

interface IScreenFrame {
  src: string;
  alt: string;
  aspect: string;
}

function ScreenFrame({ src, alt, aspect }: IScreenFrame) {
  return (
    <div className="w-full max-w-[218px] shrink-0 chamfer-md bg-[#0b0b0d] p-2 ring-1 ring-inset ring-[#2a2a30]">
      <div className={`relative w-full overflow-hidden ${aspect}`}>
        <Image src={src} alt={alt} fill sizes="210px" className="object-cover object-top" />
      </div>
    </div>
  );
}

export function SpacesEventsSection() {
  return (
    <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:mt-28 lg:px-8">
      <SectionHeading
        numeral="II"
        kicker="Conexão digital e presencial"
        title="Espaços credenciados e eventos no seu radar"
        description="O TableForge não conecta você apenas a jogadores: levamos sua party para mesas de verdade em lojas parceiras e mostramos onde estão acontecendo os maiores encontros da sua região."
        align="center"
      />

      <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="flex flex-col justify-between gap-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <MugSpot className="h-16 w-16" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#ffb700]">Lojas & Espaços</span>
            </div>
            <h3 className="font-display text-xl font-bold uppercase tracking-[0.04em] text-[#faf3e0]">
              Reserve mesas em lojas geek parceiras
            </h3>
            <p className="text-sm leading-relaxed text-[#D1D1D1]">
              Consulte a capacidade de mesas, comodidades (ar-condicionado, tomadas, lanches, tabuleiro) e horários de funcionamento. Reserve o espaço da sua sessão direto pelo app sem desencontros.
            </p>
            <HighlightList items={SPACE_HIGHLIGHTS} />
          </div>

          <div className="flex flex-col items-center gap-6 sm:flex-row">
            <ScreenFrame src="/app-screens/spaces.png" alt="Lista de Espaços no TableForge" aspect="aspect-[450/919]" />
            <div className="w-full space-y-3 sm:w-auto">
              <p className="text-xs text-[#717171]">Tem uma loja ou espaço geek na sua cidade?</p>
              <Link href="/para-lojas">
                <Button size="sm" variant="outline" className="w-full sm:w-auto">
                  <span>Cadastrar meu espaço</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </Card>

        <Card className="flex flex-col justify-between gap-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <HornSpot className="h-16 w-16" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#ffb700]">Eventos & Torneios</span>
            </div>
            <h3 className="font-display text-xl font-bold uppercase tracking-[0.04em] text-[#faf3e0]">
              Participe de encontros, one-shots e campeonatos
            </h3>
            <p className="text-sm leading-relaxed text-[#D1D1D1]">
              Fique por dentro de eventos organizados pela comunidade e por lojistas locais: encontros de RPG de mesa para iniciantes, campeonatos de card games e noites de board games modernos.
            </p>
            <HighlightList items={EVENT_HIGHLIGHTS} />
          </div>

          <div className="flex flex-col items-center gap-6 sm:flex-row">
            <ScreenFrame src="/app-screens/events.png" alt="Lista de Eventos no TableForge" aspect="aspect-[450/916]" />
            <div className="w-full space-y-3 sm:w-auto">
              <p className="text-xs text-[#717171]">Explore todos os eventos disponíveis na sua região pelo app.</p>
              <Link href="/#baixar-app">
                <Button size="sm" variant="primary" className="w-full sm:w-auto">
                  <span>Acessar no app</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
