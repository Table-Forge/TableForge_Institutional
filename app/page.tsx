import React from "react";
import Link from "next/link";
import { ArrowRight, MessageSquare, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AppDownloadButtons } from "@/components/ui/app-download-buttons";
import { SectionHeading } from "@/components/ui/section-heading";
import { ForgeBand } from "@/components/ui/forge-band";
import { ForgeDivider } from "@/components/ui/forge-divider";
import {
  CompassSpot,
  DieSpot,
  EventBannerSpot,
  MasterScreenSpot,
  ScrollSpot,
  SealCalendarSpot,
  StoreSignSpot,
  TableSpot,
} from "@/components/ui/spot-art";
import { BlogCard } from "@/components/blog/blog-card";
import { TopicRow } from "@/components/taverna/topic-row";
import { initialBlogPosts } from "@/data/blog.mock";
import { initialTavernaTopics } from "@/data/taverna.mock";
import { AppPreviewMockup } from "@/components/home/app-preview-mockup";
import { DiceFeatureSection } from "@/components/home/dice-feature-section";
import { SpacesEventsSection } from "@/components/home/spaces-events-section";
import { HeroBanner } from "@/components/home/hero-banner/hero-banner";

const APP_FEATURES = [
  {
    title: "Busca por raio em km",
    description: "Filtre jogadores e mestres a 5, 10 ou 30 km do seu endereço para encontros presenciais ou online.",
    Spot: CompassSpot,
  },
  {
    title: "Fichas e campanhas",
    description: "Crie personagens, gerencie o histórico de sessões e mantenha anotações compartilhadas com seu grupo.",
    Spot: ScrollSpot,
  },
  {
    title: "Reserva de espaços",
    description: "Consulte a disponibilidade de mesas em lojas geek credenciadas e garanta seu horário de jogo sem atrito.",
    Spot: TableSpot,
  },
  {
    title: "Chat e calendário",
    description: "Troque mensagens diretas, organize grupos de mesa e confirme presença nas sessões pelo calendário nativo.",
    Spot: SealCalendarSpot,
  },
];

const AUDIENCES = [
  {
    title: "Para Jogadores",
    description: "Encontre campanhas ativas perto de você pelo app, crie fichas de personagens e monte sua party sem complicações.",
    href: "/#baixar-app",
    cta: "Baixar para jogar",
    Spot: DieSpot,
  },
  {
    title: "Para Mestres",
    description: "Divulgue suas campanhas, selecione jogadores compatíveis com seus horários e acesse as discussões d'A Taverna.",
    href: "/taverna/mestres-narradores",
    cta: "Dicas de narrativa",
    Spot: MasterScreenSpot,
  },
  {
    title: "Para Lojas & Espaços",
    description: "Coloque seu espaço onde os jogadores estão. Transforme mesas vazias em novas aventuras e receba reservas.",
    href: "/para-lojas",
    cta: "Programa de lojas",
    Spot: StoreSignSpot,
  },
  {
    title: "Para Organizadores",
    description: "Divulgue campeonatos, encontros temáticos e dias de demonstração direto para o público engajado da sua cidade.",
    href: "/para-lojas",
    cta: "Cadastrar evento",
    Spot: EventBannerSpot,
  },
];

export default function HomePage() {
  const recentTopics = initialTavernaTopics.slice(0, 3);
  const recentPosts = initialBlogPosts.slice(0, 3);

  return (
    <div className="pb-20">
      <HeroBanner />

      <ForgeBand id="baixar-app" className="scroll-mt-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          <div className="space-y-10 lg:col-span-7">
            <SectionHeading
              numeral="I"
              kicker="O balcão da forja"
              title="Tudo o que você precisa para jogar, reunido no seu bolso"
              description="Chega de espalhar seu grupo por canais temporários de chat e mensagens perdidas. O aplicativo TableForge centraliza a formação de mesas e a conexão com espaços locais."
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {APP_FEATURES.map(({ title, description, Spot }) => (
                <Card key={title} className="flex gap-4">
                  <Spot className="h-16 w-16 shrink-0" />
                  <div className="space-y-1.5">
                    <h3 className="font-display text-sm font-bold uppercase tracking-[0.06em] text-[#faf3e0]">{title}</h3>
                    <p className="text-xs leading-relaxed text-[#A1A1A1]">{description}</p>
                  </div>
                </Card>
              ))}
            </div>

            <AppDownloadButtons size="md" />
          </div>

          <div className="lg:col-span-5 lg:-mb-24">
            <AppPreviewMockup />
          </div>
        </div>
      </ForgeBand>

      <SpacesEventsSection />

      <DiceFeatureSection />

      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:mt-28 lg:px-8">
        <SectionHeading
          numeral="IV"
          kicker="Segmentos da plataforma"
          title="Um ecossistema para cada papel da mesa"
          description="Não importa se você rola os dados, narra as histórias, gerencia uma loja física ou organiza grandes encontros."
        />

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {AUDIENCES.map(({ title, description, href, cta, Spot }) => (
            <Card key={title} variant="interactive" className="flex flex-col justify-between gap-6">
              <div className="space-y-4">
                <Spot className="h-20 w-20" />
                <h3 className="font-display text-base font-bold uppercase tracking-[0.06em] text-[#faf3e0] transition-colors group-hover:text-[#ff5a36]">
                  {title}
                </h3>
                <p className="text-xs leading-relaxed text-[#A1A1A1]">{description}</p>
              </div>
              <Link
                href={href}
                className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#ff5a36] transition-colors hover:text-[#faf3e0]"
              >
                {cta}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:mt-28 lg:px-8">
        <SectionHeading
          numeral="V"
          kicker="Base de conhecimento permanente"
          title="A Taverna da comunidade"
          description="Enquanto a busca ativa de mesas ocorre no app, n'A Taverna você encontra debates de regras, dúvidas de sistemas e guias duradouros."
          action={
            <Link href="/taverna">
              <Button variant="outline" size="sm">
                <MessageSquare className="h-4 w-4" />
                <span>Explorar A Taverna</span>
              </Button>
            </Link>
          }
        />

        <ForgeDivider label="Últimas discussões" className="my-8" />

        <div className="space-y-3">
          {recentTopics.map((topic) => (
            <TopicRow key={topic.id} topic={topic} />
          ))}
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:mt-28 lg:px-8">
        <SectionHeading
          numeral="VI"
          kicker="Blog e conteúdo educativo"
          title="Guias para mestres e novidades do ecossistema"
          description="Artigos produzidos para elevar o nível das suas mesas e aproximar a comunidade."
          action={
            <Link href="/blog">
              <Button variant="outline" size="sm">
                <Sparkles className="h-4 w-4" />
                <span>Todos os artigos</span>
              </Button>
            </Link>
          }
        />

        <ForgeDivider label="Da forja para a mesa" className="my-8" />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {recentPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      <ForgeBand className="mt-20 lg:mt-28">
        <div className="flex flex-col items-center gap-8 text-center">
          <DieSpot className="h-24 w-24" />
          <SectionHeading
            numeral="VII"
            kicker="Baixe agora"
            title="Sua próxima mesa começa no app TableForge"
            description="Encontre jogadores e campanhas próximas em minutos. O aplicativo está disponível gratuitamente para Android e iOS."
            size="lg"
            align="center"
          />
          <AppDownloadButtons size="lg" className="justify-center" />
        </div>
      </ForgeBand>
    </div>
  );
}
