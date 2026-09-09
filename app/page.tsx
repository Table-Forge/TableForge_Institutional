import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AppDownloadButtons } from "@/components/ui/app-download-buttons";
import { BlogCard } from "@/components/blog/blog-card";
import { TopicRow } from "@/components/taverna/topic-row";
import { initialBlogPosts } from "@/data/blog.mock";
import { initialTavernaTopics } from "@/data/taverna.mock";
import {
  Users,
  Shield,
  Calendar,
  Flame,
  ArrowRight,
  MessageSquare,
  Sparkles,
  Dice6,
  Smartphone,
  Navigation,
  BookOpen,
  MapPin,
} from "lucide-react";

export default function HomePage() {
  const recentTopics = initialTavernaTopics.slice(0, 3);
  const recentPosts = initialBlogPosts.slice(0, 3);

  return (
    <div className="space-y-20 lg:space-y-28 pb-20">
      <section className="relative overflow-hidden pt-14 lg:pt-20 pb-16 border-b border-[#1E1E1E]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#ff2400]/20 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <Badge variant="primary" size="md">
                <Smartphone className="w-3.5 h-3.5 text-[#ff2400]" />
                <span>Aplicativo Oficial TableForge para iOS e Android</span>
              </Badge>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#faf3e0] tracking-tight leading-[1.1]">
                Encontre sua party de RPG <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff2400] via-[#ff5a36] to-[#faf3e0]">
                  diretamente no aplicativo.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#D1D1D1] max-w-xl mx-auto lg:mx-0 leading-relaxed">
                O TableForge é o app por geolocalização que conecta você a jogadores, mestres e mesas em lojas físicas parceiras. Defina seu bairro, raio de busca e comece a jogar.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <AppDownloadButtons size="md" />
                  <Link href="/taverna">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      <MessageSquare className="w-4 h-4 text-[#ff2400]" />
                      <span>Visitar A Taverna</span>
                    </Button>
                  </Link>
                </div>
                <p className="text-xs text-[#717171]">
                  Disponível para download gratuito. Cadastre-se e entre na primeira leva de aventureiros.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-6 border-t border-[#1E1E1E] text-left">
                <div>
                  <p className="text-xl sm:text-2xl font-black text-[#ff2400]">Por Raio</p>
                  <p className="text-[11px] text-[#A1A1A1] font-medium">Jogadores perto de você</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-black text-[#faf3e0]">Presencial</p>
                  <p className="text-[11px] text-[#A1A1A1] font-medium">Reserva em lojas parceiras</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-black text-[#ff2400]">Completo</p>
                  <p className="text-[11px] text-[#A1A1A1] font-medium">Fichas, chat e campanhas</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm rounded-3xl border-2 border-[#3a3a3a] bg-gradient-to-b from-[#2D2D2D] to-[#1E1E1E] p-4 shadow-2xl shadow-[#ff2400]/10">
                <div className="w-full rounded-2xl bg-[#000000] border border-[#2D2D2D] p-4 space-y-4 text-xs text-[#faf3e0]">
                  <div className="flex items-center justify-between pb-3 border-b border-[#2D2D2D]">
                    <div className="flex items-center gap-2">
                      <Navigation className="w-4 h-4 text-[#ff2400]" />
                      <span className="font-bold">Parties Próximas (Raio: 15 km)</span>
                    </div>
                    <span className="text-[10px] bg-[#ff2400]/20 text-[#ff2400] px-2 py-0.5 rounded font-semibold">
                      Ao Vivo
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    <div className="p-3 rounded-lg bg-[#1E1E1E] border border-[#2D2D2D] space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#faf3e0]">Tormenta20: Fim dos Tempos</span>
                        <span className="text-[10px] text-[#ff2400] font-semibold">1 vaga</span>
                      </div>
                      <p className="text-[11px] text-[#A1A1A1]">Mestre Valen • Sábados às 14h</p>
                      <div className="flex items-center gap-1.5 text-[10px] text-[#717171]">
                        <MapPin className="w-3 h-3 text-[#ff2400]" />
                        <span>Mesa física em loja parceira (Centro)</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-[#1E1E1E] border border-[#2D2D2D] space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#faf3e0]">D&D 5e: Curse of Strahd</span>
                        <span className="text-[10px] text-green-400 font-semibold">2 vagas</span>
                      </div>
                      <p className="text-[11px] text-[#A1A1A1]">Narrador Arthur • Sextas às 19h</p>
                      <div className="flex items-center gap-1.5 text-[10px] text-[#717171]">
                        <MapPin className="w-3 h-3 text-[#ff2400]" />
                        <span>A 4.2 km de você</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-[#1E1E1E] border border-[#2D2D2D] space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#faf3e0]">Noite de Board Games Modernos</span>
                        <span className="text-[10px] text-amber-400 font-semibold">Mesa aberta</span>
                      </div>
                      <p className="text-[11px] text-[#A1A1A1]">Catan, Wingspan e Terraforming Mars</p>
                      <div className="flex items-center gap-1.5 text-[10px] text-[#717171]">
                        <MapPin className="w-3 h-3 text-[#ff2400]" />
                        <span>Dragão Geek Store • A 2.8 km</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 text-center">
                    <p className="text-[10px] text-[#717171]">Simulação da interface do aplicativo TableForge</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="baixar-app" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#1E1E1E] via-[#2D2D2D] to-[#1E1E1E] border border-[#ff2400]/40 rounded-3xl p-8 lg:p-14 shadow-xl">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
            <Badge variant="primary" className="mx-auto">
              <Flame className="w-3.5 h-3.5 fill-[#ff2400]" />
              <span>O Matchmaking Acontece Aqui</span>
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#faf3e0] tracking-tight">
              Tudo o que você precisa para jogar, reunido no seu bolso
            </h2>
            <p className="text-sm sm:text-base text-[#D1D1D1] leading-relaxed">
              Chega de espalhar seu grupo por canais temporários de chat e mensagens perdidas. O aplicativo TableForge centraliza a formação de mesas e a conexão com espaços locais.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <div className="bg-[#1E1E1E] border border-[#2D2D2D] rounded-xl p-5 space-y-2.5">
              <div className="w-9 h-9 rounded-lg bg-[#ff2400]/15 flex items-center justify-center text-[#ff2400]">
                <Navigation className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#faf3e0]">Busca por Raio em KM</h3>
              <p className="text-xs text-[#A1A1A1] leading-relaxed">
                Filtre jogadores e mestres a 5, 10 ou 30 km do seu endereço para encontros presenciais ou online.
              </p>
            </div>

            <div className="bg-[#1E1E1E] border border-[#2D2D2D] rounded-xl p-5 space-y-2.5">
              <div className="w-9 h-9 rounded-lg bg-purple-950/40 flex items-center justify-center text-purple-400">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#faf3e0]">Fichas e Campanhas</h3>
              <p className="text-xs text-[#A1A1A1] leading-relaxed">
                Crie personagens, gerencie histórico de sessões e mantenha anotações compartilhadas com seu grupo.
              </p>
            </div>

            <div className="bg-[#1E1E1E] border border-[#2D2D2D] rounded-xl p-5 space-y-2.5">
              <div className="w-9 h-9 rounded-lg bg-amber-950/40 flex items-center justify-center text-amber-400">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#faf3e0]">Reserva de Espaços</h3>
              <p className="text-xs text-[#A1A1A1] leading-relaxed">
                Consulte a disponibilidade de mesas em lojas geek credenciadas e garanta seu horário de jogo sem atrito.
              </p>
            </div>

            <div className="bg-[#1E1E1E] border border-[#2D2D2D] rounded-xl p-5 space-y-2.5">
              <div className="w-9 h-9 rounded-lg bg-cyan-950/40 flex items-center justify-center text-cyan-400">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#faf3e0]">Chat & Calendário</h3>
              <p className="text-xs text-[#A1A1A1] leading-relaxed">
                Troque mensagens diretas, organize grupos de mesa e confirme presença nas sessões pelo calendário nativo.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 border-t border-[#3a3a3a]">
            <AppDownloadButtons size="lg" />
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <Badge variant="secondary">Segmentos da Plataforma</Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#faf3e0]">
            Um ecossistema criado para cada papel da mesa
          </h2>
          <p className="text-sm text-[#A1A1A1]">
            Não importa se você rola os dados, narra as histórias, gerencia uma loja física ou organiza grandes encontros.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card variant="interactive" className="space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#ff2400]/10 border border-[#ff2400]/30 flex items-center justify-center text-[#ff2400]">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#faf3e0]">Para Jogadores</h3>
              <p className="text-xs text-[#A1A1A1] leading-relaxed">
                Encontre campanhas ativas perto de você pelo app, crie fichas de personagens e monte sua party sem complicações.
              </p>
            </div>
            <Link href="/#baixar-app" className="text-xs font-semibold text-[#ff2400] hover:underline inline-flex items-center gap-1 pt-2">
              Baixar para jogar →
            </Link>
          </Card>

          <Card variant="interactive" className="space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-purple-950/40 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <Dice6 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#faf3e0]">Para Mestres</h3>
              <p className="text-xs text-[#A1A1A1] leading-relaxed">
                Divulgue suas campanhas, selecione jogadores compatíveis com seus horários e acesse discussões d&apos;A Taverna.
              </p>
            </div>
            <Link href="/taverna/mestres-narradores" className="text-xs font-semibold text-purple-400 hover:underline inline-flex items-center gap-1 pt-2">
              Dicas de narrativa →
            </Link>
          </Card>

          <Card variant="interactive" className="space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-amber-950/40 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#faf3e0]">Para Lojas & Espaços</h3>
              <p className="text-xs text-[#A1A1A1] leading-relaxed">
                Coloque seu espaço onde os jogadores estão. Transforme mesas vazias em novas aventuras e receba solicitações de reserva.
              </p>
            </div>
            <Link href="/para-lojas" className="text-xs font-semibold text-amber-400 hover:underline inline-flex items-center gap-1 pt-2">
              Conhecer programa de lojas →
            </Link>
          </Card>

          <Card variant="interactive" className="space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#faf3e0]">Para Organizadores</h3>
              <p className="text-xs text-[#A1A1A1] leading-relaxed">
                Divulgação de campeonatos, encontros temáticos e dias de demonstração direto para o público engajado da sua cidade.
              </p>
            </div>
            <Link href="/para-lojas" className="text-xs font-semibold text-cyan-400 hover:underline inline-flex items-center gap-1 pt-2">
              Cadastrar evento parceiro →
            </Link>
          </Card>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#ff2400] uppercase tracking-wider">
              <MessageSquare className="w-4 h-4" />
              <span>Base de Conhecimento Permanente</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#faf3e0]">
              A Taverna da Comunidade
            </h2>
            <p className="text-sm text-[#A1A1A1]">
              Enquanto a busca ativa de mesas ocorre no app, n&apos;A Taverna você encontra debates de regras, dúvidas de sistemas e guias duradouros.
            </p>
          </div>
          <Link href="/taverna">
            <Button variant="outline" size="sm">
              <span>Explorar A Taverna</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="space-y-3">
          {recentTopics.map((topic) => (
            <TopicRow key={topic.id} topic={topic} />
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#ff2400] uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Blog & Conteúdo Educativo</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#faf3e0]">
              Guias para mestres e novidades do ecossistema
            </h2>
            <p className="text-sm text-[#A1A1A1]">
              Artigos produzidos para elevar o nível das suas mesas e aproximar a comunidade.
            </p>
          </div>
          <Link href="/blog">
            <Button variant="outline" size="sm">
              <span>Explorar todos os artigos</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-[#ff2400]/40 bg-gradient-to-br from-[#2D2D2D] via-[#1E1E1E] to-[#000000] p-8 lg:p-14 text-center space-y-6">
          <div className="max-w-2xl mx-auto space-y-4">
            <Badge variant="primary" className="mx-auto">
              <Smartphone className="w-3.5 h-3.5 text-[#ff2400]" />
              <span>Baixe Agora</span>
            </Badge>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-[#faf3e0] tracking-tight">
              Sua próxima mesa começa no app TableForge.
            </h3>
            <p className="text-sm text-[#D1D1D1] leading-relaxed">
              Encontre jogadores e campanhas próximas em minutos. O aplicativo está disponível gratuitamente para Android e iOS.
            </p>
            <div className="flex justify-center pt-2">
              <AppDownloadButtons size="lg" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
