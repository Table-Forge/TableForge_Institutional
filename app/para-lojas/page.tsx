"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PartnerLeadSchema, IPartnerLeadForm } from "@/schemas/partner.schema";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { KeystoneIcon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { CompassSpot, HornSpot, TableSpot } from "@/components/ui/spot-art";
import { CheckCircle, MapPin, Send } from "lucide-react";

const BENEFITS = [
  {
    title: "Visibilidade no mapa",
    description:
      "Jogadores que buscam mesas por geolocalização encontram seu espaço físico com horários, jogos disponíveis e comodidades.",
    Spot: CompassSpot,
  },
  {
    title: "Reservas pelo aplicativo",
    description:
      "Receba solicitações organizadas de mestres e grupos, aprove os horários e garanta consumo no seu espaço sem atrito.",
    Spot: TableSpot,
  },
  {
    title: "Divulgação de eventos",
    description:
      "Publique campeonatos de TCG, lançamentos de board games e dias de mesas abertas com confirmação de presença no app.",
    Spot: HornSpot,
  },
];

const FOUNDER_PERKS = [
  <>Selo exclusivo de <strong>Parceiro Fundador</strong> com destaque permanente no app e n&apos;A Taverna.</>,
  <>Kit presencial TableForge com display de mesa e QR Code exclusivo para captação de jogadores.</>,
  <>Cobertura do seu espaço na nossa série de conteúdos <em>Rotas da Forja</em> no Blog e redes sociais.</>,
  <>Canal direto com os fundadores e suporte prioritário para novos recursos de agendamento.</>,
];

export default function ParaLojasPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IPartnerLeadForm>({
    resolver: zodResolver(PartnerLeadSchema),
    defaultValues: {
      type: 1,
    },
  });

  const onSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      reset();
    }, 600);
  };

  return (
    <div className="mx-auto max-w-6xl space-y-16 px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      <SectionHeading
        level="h1"
        size="lg"
        align="center"
        kicker="Parceiro Fundador TableForge"
        title="Transforme mesas vazias em novas aventuras"
        description="Coloque seu espaço geek, loja de board games ou evento presencial diretamente no radar de milhares de jogadores da sua cidade."
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {BENEFITS.map(({ title, description, Spot }) => (
          <Card key={title} className="flex flex-col gap-4">
            <Spot className="h-20 w-20" />
            <h3 className="font-display text-base font-bold uppercase tracking-[0.05em] text-[#faf3e0]">{title}</h3>
            <p className="text-xs leading-relaxed text-[#A1A1A1]">{description}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
        <div className="relative space-y-6 lg:col-span-5">
          <div
            aria-hidden="true"
            className="absolute -right-2 -top-6 rotate-12 chamfer-sm border-2 border-[#ff2400]/60 px-3 py-1 text-[10px] font-black uppercase tracking-[0.3em] text-[#ff2400]/80"
          >
            Parceiro fundador
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-2xl font-bold uppercase tracking-[0.03em] text-[#faf3e0]">
              O que você recebe como Parceiro Fundador?
            </h2>
            <p className="text-xs leading-relaxed text-[#A1A1A1] sm:text-sm">
              Estamos selecionando um grupo pioneiro de lojas e organizadores regionais para moldar a plataforma conosco.
            </p>
          </div>

          <ul className="space-y-3 text-xs text-[#D1D1D1] sm:text-sm">
            {FOUNDER_PERKS.map((perk, index) => (
              <li key={index} className="flex items-start gap-2.5">
                <KeystoneIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#ff2400]" aria-hidden="true" />
                <span>{perk}</span>
              </li>
            ))}
          </ul>

          <Card padding="sm" className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#faf3e0]">
              <MapPin className="h-4 w-4 text-[#ff2400]" />
              <span>Como seu espaço aparece no aplicativo:</span>
            </div>
            <p className="text-[11px] leading-relaxed text-[#A1A1A1]">
              Jogadores da sua cidade visualizam sua loja, comodidades, quantidade de mesas disponíveis e podem solicitar reservas sem intermediários.
            </p>
            <div className="mx-auto w-full max-w-[218px] chamfer-md bg-[#0b0b0d] p-2 ring-1 ring-inset ring-[#2a2a30]">
              <div className="relative aspect-[450/919] w-full overflow-hidden">
                <Image
                  src="/app-screens/spaces.png"
                  alt="Exibição de Espaços no App TableForge"
                  fill
                  sizes="210px"
                  className="object-cover object-top"
                />
              </div>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-7">
          <Card className="p-6 sm:p-8">
            {isSubmitted ? (
              <div className="space-y-4 py-10 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center chamfer-sm bg-[#ff2400]/15 text-[#ffb700] ring-1 ring-inset ring-[#ff2400]/50">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl font-bold uppercase tracking-[0.03em] text-[#faf3e0]">
                  Candidatura enviada
                </h3>
                <p className="mx-auto max-w-md text-xs text-[#A1A1A1] sm:text-sm">
                  Obrigado pelo interesse! Nossa equipe entrará em contato em até 48 horas para apresentar a demonstração ao vivo e entregar seu kit.
                </p>
                <Button size="sm" variant="outline" onClick={() => setIsSubmitted(false)}>
                  Enviar outra candidatura
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-1">
                  <h3 className="font-display text-lg font-bold uppercase tracking-[0.03em] text-[#faf3e0]">
                    Candidatura de parceiro
                  </h3>
                  <p className="text-xs text-[#A1A1A1]">
                    Preencha os dados básicos do seu espaço ou evento para agendarmos uma conversa.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Input
                    label="Nome da Loja, Espaço ou Evento"
                    placeholder="Ex: Taverna Geek Store"
                    error={errors.spaceOrEventName?.message}
                    {...register("spaceOrEventName")}
                  />
                  <Input
                    label="Nome do Responsável"
                    placeholder="Ex: Carlos Eduardo"
                    error={errors.responsibleName?.message}
                    {...register("responsibleName")}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Input
                    label="E-mail de Contato"
                    type="email"
                    placeholder="contato@seuespaco.com.br"
                    error={errors.email?.message}
                    {...register("email")}
                  />
                  <Input
                    label="Telefone / Celular para contato"
                    placeholder="(00) 00000-0000"
                    error={errors.phone?.message}
                    {...register("phone")}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="sm:col-span-2">
                    <Input
                      label="Cidade"
                      placeholder="Ex: Londrina"
                      error={errors.city?.message}
                      {...register("city")}
                    />
                  </div>
                  <div>
                    <Input
                      label="UF"
                      placeholder="PR"
                      maxLength={2}
                      error={errors.state?.message}
                      {...register("state")}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label htmlFor="type" className="block text-xs font-medium text-[#D1D1D1]">
                      Tipo de Parceria
                    </label>
                    <select
                      id="type"
                      className="w-full rounded-lg border border-[#3a3a3a] bg-[#1E1E1E] px-3.5 py-2.5 text-sm text-[#faf3e0] focus:border-[#ff2400] focus:outline-none focus:ring-1 focus:ring-[#ff2400]"
                      {...register("type", { valueAsNumber: true })}
                    >
                      <option value={1} className="bg-[#1E1E1E]">Loja Física / Espaço Geek</option>
                      <option value={2} className="bg-[#1E1E1E]">Organizador de Eventos / Encontros</option>
                    </select>
                  </div>

                  <Input
                    label="Quantidade estimada de mesas"
                    type="number"
                    placeholder="Ex: 6"
                    error={errors.estimatedTablesOrCapacity?.message}
                    {...register("estimatedTablesOrCapacity", { valueAsNumber: true })}
                  />
                </div>

                <Textarea
                  label="Conte um pouco sobre suas atividades (opcional)"
                  placeholder="Ex: Realizamos noites de RPG às sextas e campeonatos de Magic aos sábados."
                  rows={3}
                  error={errors.notes?.message}
                  {...register("notes")}
                />

                <div className="pt-2">
                  <Button type="submit" size="md" variant="primary" className="w-full" isLoading={isSubmitting}>
                    <Send className="h-4 w-4" />
                    <span>Submeter candidatura de parceiro</span>
                  </Button>
                </div>
              </form>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
