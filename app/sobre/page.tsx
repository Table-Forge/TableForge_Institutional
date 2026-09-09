import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Flame, Compass, Shield, Users, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Sobre a Forja | Manifesto & Missão",
  description: "Conheça a história, missão e o manifesto do TableForge: unindo a comunidade brasileira de RPG, board games e TCG.",
};

export default function SobrePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 space-y-16">
      <div className="text-center space-y-4">
        <Badge variant="primary" className="mx-auto">
          <Flame className="w-3.5 h-3.5 fill-[#ff2400]" />
          <span>Manifesto TableForge</span>
        </Badge>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#faf3e0] tracking-tight">
          O Ponto de Encontro do RPG de Mesa
        </h1>
        <p className="text-base sm:text-lg text-[#A1A1A1] max-w-2xl mx-auto leading-relaxed">
          Nascemos da dor real de quem vive RPG no Brasil e passa mais tempo tentando reunir o grupo do que de fato rolando dados.
        </p>
      </div>

      <div className="space-y-6 text-sm sm:text-base text-[#D1D1D1] leading-relaxed bg-[#1E1E1E] border border-[#2D2D2D] rounded-2xl p-6 sm:p-10">
        <h2 className="text-xl sm:text-2xl font-bold text-[#faf3e0]">
          Por que criamos o TableForge?
        </h2>
        <p>
          Durante anos, organizar uma campanha de RPG ou encontrar um grupo de board games significou a mesma rotina exaustiva: mandar mensagens em grupos abandonados de Facebook, criar mais um canal de Discord com 50 notificações silenciadas, perder fichas de personagens em pastas de Drive e torcer para que os jogadores confirmem presença.
        </p>
        <p>
          Pior ainda: quem se muda de cidade ou quer experimentar mesas presenciais fica completamente à deriva. As lojas físicas possuem mesas vazias durante a semana, enquanto dezenas de jogadores na mesma região não sabem onde jogar nem com quem se conectar.
        </p>
        <p className="font-semibold text-[#faf3e0] border-l-2 border-[#ff2400] pl-4 italic">
          O TableForge não é apenas um gerenciador de campanhas. Ele é a ponte viva entre o universo digital e presencial do hobby.
        </p>
      </div>

      <div className="space-y-8">
        <div className="text-center space-y-2">
          <Badge variant="secondary">Nossos Pilares</Badge>
          <h3 className="text-2xl font-bold text-[#faf3e0]">
            Os quatro alicerces da nossa comunidade
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#ff2400]/10 border border-[#ff2400]/30 flex items-center justify-center text-[#ff2400]">
              <Compass className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-[#faf3e0]">1. Encontre por Geolocalização</h4>
            <p className="text-xs text-[#A1A1A1] leading-relaxed">
              Defina seu bairro e raio de busca. Encontre parceiros de party, mestres procurando jogadores e eventos a poucos quilômetros de você.
            </p>
          </Card>

          <Card className="space-y-3">
            <div className="w-10 h-10 rounded-lg bg-purple-950/40 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-[#faf3e0]">2. A Taverna Permanente</h4>
            <p className="text-xs text-[#A1A1A1] leading-relaxed">
              Um fórum comunitário indexável onde dúvidas de regras, guias de Sessão Zero e dicas narrativas ficam arquivados para sempre, gerando valor contínuo no Google.
            </p>
          </Card>

          <Card className="space-y-3">
            <div className="w-10 h-10 rounded-lg bg-amber-950/40 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Shield className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-[#faf3e0]">3. Valorização dos Espaços Físicos</h4>
            <p className="text-xs text-[#A1A1A1] leading-relaxed">
              Lojas geek e taberneiros locais ganham visibilidade direta no mapa para que seus horários livres sejam preenchidos por jogadores reais.
            </p>
          </Card>

          <Card className="space-y-3">
            <div className="w-10 h-10 rounded-lg bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Flame className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-[#faf3e0]">4. Feito por Quem Joga</h4>
            <p className="text-xs text-[#A1A1A1] leading-relaxed">
              Nosso time é composto por mestres e entusiastas que vivem o hobby há décadas. Cada detalhe da interface é pensado com carinho para quem rola dados.
            </p>
          </Card>
        </div>
      </div>

      <div className="bg-gradient-to-r from-[#1E1E1E] via-[#2D2D2D] to-[#1E1E1E] border border-[#2D2D2D] rounded-2xl p-8 text-center space-y-4">
        <h3 className="text-xl font-bold text-[#faf3e0]">
          Quer fazer parte da construção do TableForge?
        </h3>
        <p className="text-xs text-[#A1A1A1] max-w-md mx-auto">
          Entre na Taverna para sugerir melhorias ou conheça a equipe por trás da plataforma.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link href="/taverna">
            <Button variant="primary" size="md">
              <span>Acessar A Taverna</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/equipe">
            <Button variant="outline" size="md">
              Conhecer a Equipe
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
