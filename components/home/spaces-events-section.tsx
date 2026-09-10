import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Calendar, ArrowRight, Shield, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function SpacesEventsSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <Badge variant="secondary">Conexão Digital & Presencial</Badge>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#faf3e0] tracking-tight">
          Espaços Credenciados & Eventos no seu Radar
        </h2>
        <p className="text-sm sm:text-base text-[#A1A1A1] leading-relaxed">
          O TableForge não conecta você apenas a jogadores: levamos sua party para mesas de verdade em lojas parceiras e mostramos onde estão acontecendo os maiores encontros da sua região.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
        <div className="rounded-xl border border-[#2D2D2D] bg-gradient-to-br from-[#1E1E1E] to-[#121212] p-6 sm:p-8 flex flex-col justify-between space-y-6 hover:border-[#ff2400]/40 transition-colors">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-lg bg-amber-950/40 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                Lojas & Espaços
              </span>
            </div>

            <h3 className="text-2xl font-bold text-[#faf3e0]">
              Reserve Mesas em Lojas Geek Parceiras
            </h3>

            <p className="text-sm text-[#D1D1D1] leading-relaxed">
              Consulte a capacidade de mesas, comodidades (ar-condicionado, tomadas, lanches, tabuleiro) e horários de funcionamento. Reserve o espaço da sua sessão direto pelo app sem desencontros.
            </p>

            <ul className="space-y-2 text-xs text-[#A1A1A1] pt-2">
              <li className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#ff2400]" />
                <span>Espaços verificados pela curadoria TableForge</span>
              </li>
              <li className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#ff2400]" />
                <span>Filtro por raio de distância e disponibilidade em tempo real</span>
              </li>
              <li className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#ff2400]" />
                <span>Integração direta com o chat da campanha</span>
              </li>
            </ul>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center gap-6">
            <div className="w-full max-w-[218px] p-2 rounded-xl bg-black border border-[#2D2D2D] shrink-0">
              <div className="relative w-full aspect-[450/919] rounded-lg overflow-hidden">
                <Image
                  src="/app-screens/spaces.png"
                  alt="Lista de Espaços no TableForge"
                  fill
                  sizes="210px"
                  className="object-cover object-top"
                />
              </div>
            </div>

            <div className="space-y-3 w-full sm:w-auto">
              <p className="text-xs text-[#717171]">
                Tem uma loja ou espaço geek na sua cidade?
              </p>
              <Link href="/para-lojas">
                <Button size="sm" variant="outline" className="w-full sm:w-auto">
                  <span>Cadastrar meu espaço</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-[#2D2D2D] bg-gradient-to-br from-[#1E1E1E] to-[#121212] p-6 sm:p-8 flex flex-col justify-between space-y-6 hover:border-[#ff2400]/40 transition-colors">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-lg bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Calendar className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-cyan-400 bg-cyan-400/10 px-3 py-1 rounded-full border border-cyan-400/20">
                Eventos & Torneios
              </span>
            </div>

            <h3 className="text-2xl font-bold text-[#faf3e0]">
              Participe de Encontros, One-Shots & Campeonatos
            </h3>

            <p className="text-sm text-[#D1D1D1] leading-relaxed">
              Fique por dentro de eventos organizados pela comunidade e por lojistas locais: encontros de RPG de mesa para iniciantes, campeonatos de card games e noites de board games modernos.
            </p>

            <ul className="space-y-2 text-xs text-[#A1A1A1] pt-2">
              <li className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Confirmação de presença e vagas atualizadas ao vivo</span>
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Notificações automáticas quando novos eventos surgem por perto</span>
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Calendário integrado às suas campanhas no app</span>
              </li>
            </ul>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center gap-6">
            <div className="w-full max-w-[218px] p-2 rounded-xl bg-black border border-[#2D2D2D] shrink-0">
              <div className="relative w-full aspect-[450/916] rounded-lg overflow-hidden">
                <Image
                  src="/app-screens/events.png"
                  alt="Lista de Eventos no TableForge"
                  fill
                  sizes="210px"
                  className="object-cover object-top"
                />
              </div>
            </div>

            <div className="space-y-3 w-full sm:w-auto">
              <p className="text-xs text-[#717171]">
                Explore todos os eventos disponíveis na sua região pelo app.
              </p>
              <Link href="/#baixar-app">
                <Button size="sm" variant="primary" className="w-full sm:w-auto">
                  <span>Acessar no App</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
