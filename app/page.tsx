import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
} from "lucide-react";

export default function HomePage() {
  const recentTopics = initialTavernaTopics.slice(0, 3);
  const recentPosts = initialBlogPosts.slice(0, 3);

  return (
    <div className="space-y-20 lg:space-y-28 pb-20">
      <section className="relative overflow-hidden pt-16 lg:pt-24 pb-12 border-b border-[#1E1E1E]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#ff2400]/15 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6 max-w-4xl">
          <Badge variant="primary" size="md" className="mx-auto">
            <Flame className="w-3.5 h-3.5 text-[#ff2400] fill-[#ff2400]" />
            <span>A Forja Está Sendo Acesa — Beta Aberta da Comunidade</span>
          </Badge>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#faf3e0] tracking-tight leading-[1.1]">
            Forje sua mesa. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff2400] via-[#ff5a36] to-[#faf3e0]">
              Encontre sua comunidade.
            </span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-[#D1D1D1] max-w-2xl mx-auto leading-relaxed">
            O TableForge é o ecossistema brasileiro que conecta a vida digital e presencial do RPG, board games e TCG. Conecte-se com jogadores por geolocalização, descubra espaços parceiros e participe d&apos;A Taverna.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
            <Link href="/taverna" className="w-full sm:w-auto">
              <Button size="lg" variant="primary" className="w-full sm:w-auto shadow-lg shadow-[#ff2400]/25">
                <Flame className="w-4 h-4 fill-current" />
                <span>Entrar n&apos;A Taverna</span>
              </Button>
            </Link>
            <Link href="/para-lojas" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                <Shield className="w-4 h-4 text-[#ff2400]" />
                <span>Seja um Parceiro Fundador</span>
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12 text-left">
            <div className="bg-[#1E1E1E]/80 border border-[#2D2D2D] rounded-xl p-4">
              <p className="text-2xl font-black text-[#ff2400]">100%</p>
              <p className="text-xs text-[#A1A1A1] mt-0.5 font-medium">Focado em RPG & Board Games</p>
            </div>
            <div className="bg-[#1E1E1E]/80 border border-[#2D2D2D] rounded-xl p-4">
              <p className="text-2xl font-black text-[#faf3e0]">Por Raio</p>
              <p className="text-xs text-[#A1A1A1] mt-0.5 font-medium">Geolocalização Inteligente</p>
            </div>
            <div className="bg-[#1E1E1E]/80 border border-[#2D2D2D] rounded-xl p-4">
              <p className="text-2xl font-black text-[#ff2400]">Permanente</p>
              <p className="text-xs text-[#A1A1A1] mt-0.5 font-medium">Base de Conhecimento na Taverna</p>
            </div>
            <div className="bg-[#1E1E1E]/80 border border-[#2D2D2D] rounded-xl p-4">
              <p className="text-2xl font-black text-[#faf3e0]">Presencial</p>
              <p className="text-xs text-[#A1A1A1] mt-0.5 font-medium">Integração com Lojas & Espaços</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <Badge variant="primary">Segmentos da Forja</Badge>
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
                Encontre campanhas ativas perto de você, crie fichas de personagens, descubra espaços geek e forme parties com facilidade.
              </p>
            </div>
            <Link href="/taverna/procuro-mesa" className="text-xs font-semibold text-[#ff2400] hover:underline inline-flex items-center gap-1 pt-2">
              Procurar mesa ativa →
            </Link>
          </Card>

          <Card variant="interactive" className="space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-purple-950/40 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <Dice6 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#faf3e0]">Para Mestres</h3>
              <p className="text-xs text-[#A1A1A1] leading-relaxed">
                Divulgue suas campanhas, filtre jogadores por compatibilidade de horários, organize sessões e acesse materiais d&apos;A Taverna.
              </p>
            </div>
            <Link href="/taverna/mestres-narradores" className="text-xs font-semibold text-purple-400 hover:underline inline-flex items-center gap-1 pt-2">
              Área dos narradores →
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
                Divulgação de campeonatos, encontros temáticos de board games e dias de demonstração direto para o público engajado da sua cidade.
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
              <span>A Taverna da Comunidade</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#faf3e0]">
              Discussões em alta na Forja
            </h2>
            <p className="text-sm text-[#A1A1A1]">
              Diferente de conversas que se perdem no Discord, o conhecimento d&apos;A Taverna permanece vivo e indexável.
            </p>
          </div>
          <Link href="/taverna">
            <Button variant="outline" size="sm">
              <span>Ver todas as categorias</span>
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
        <div className="relative overflow-hidden rounded-2xl border border-[#ff2400]/40 bg-gradient-to-br from-[#2D2D2D] via-[#1E1E1E] to-[#000000] p-8 lg:p-14 text-center space-y-6">
          <div className="max-w-2xl mx-auto space-y-4">
            <Badge variant="primary" className="mx-auto">Junte-se a Nós</Badge>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-[#faf3e0] tracking-tight">
              Sua próxima grande aventura começa na Forja.
            </h3>
            <p className="text-sm text-[#D1D1D1] leading-relaxed">
              O TableForge está construindo uma comunidade nacional, cidade por cidade. Comece participando d&apos;A Taverna ou cadastre seu espaço físico hoje mesmo.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link href="/taverna">
                <Button variant="primary" size="lg">
                  Entrar n&apos;A Taverna
                </Button>
              </Link>
              <Link href="/sobre">
                <Button variant="outline" size="lg">
                  Conhecer o Manifesto
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
