"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PartnerLeadSchema, IPartnerLeadForm } from "@/schemas/partner.schema";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Shield, CheckCircle, MapPin, Calendar, Users, Send } from "lucide-react";

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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 space-y-16">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <Badge variant="primary" className="mx-auto">
          <Shield className="w-3.5 h-3.5 text-[#ff2400]" />
          <span>Parceiro Fundador TableForge</span>
        </Badge>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#faf3e0] tracking-tight">
          Transforme Mesas Vazias em Novas Aventuras
        </h1>
        <p className="text-sm sm:text-base text-[#A1A1A1] leading-relaxed">
          Coloque seu espaço geek, loja de board games ou evento presencial diretamente no radar de milhares de jogadores da sua cidade.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="space-y-3">
          <div className="w-10 h-10 rounded-lg bg-[#ff2400]/10 border border-[#ff2400]/30 flex items-center justify-center text-[#ff2400]">
            <MapPin className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#faf3e0]">Visibilidade no Mapa</h3>
          <p className="text-xs text-[#A1A1A1] leading-relaxed">
            Jogadores que buscam mesas por geolocalização encontram seu espaço físico com horários, jogos disponíveis e comodidades.
          </p>
        </Card>

        <Card className="space-y-3">
          <div className="w-10 h-10 rounded-lg bg-amber-950/40 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#faf3e0]">Reservas pelo Aplicativo</h3>
          <p className="text-xs text-[#A1A1A1] leading-relaxed">
            Receba solicitações organizadas de mestres e grupos, aprove os horários e garanta consumo no seu espaço sem atrito.
          </p>
        </Card>

        <Card className="space-y-3">
          <div className="w-10 h-10 rounded-lg bg-purple-950/40 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <Calendar className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#faf3e0]">Divulgação de Eventos</h3>
          <p className="text-xs text-[#A1A1A1] leading-relaxed">
            Publique campeonatos de TCG, lançamentos de board games e dias de mesas abertas com confirmação de presença no app.
          </p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-[#faf3e0]">
              O que você recebe como Parceiro Fundador?
            </h2>
            <p className="text-xs sm:text-sm text-[#A1A1A1] leading-relaxed">
              Estamos selecionando um grupo pioneiro de lojas e organizadores regionais para moldar a plataforma conosco.
            </p>
          </div>

          <ul className="space-y-3 text-xs sm:text-sm text-[#D1D1D1]">
            <li className="flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-[#ff2400] shrink-0 mt-0.5" />
              <span>Selo exclusivo de <strong>Parceiro Fundador</strong> com destaque permanente no app e n&apos;A Taverna.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-[#ff2400] shrink-0 mt-0.5" />
              <span>Kit presencial TableForge com display de mesa e QR Code exclusivo para captação de jogadores.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-[#ff2400] shrink-0 mt-0.5" />
              <span>Cobertura do seu espaço na nossa série de conteúdos <em>Rotas da Forja</em> no Blog e redes sociais.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-[#ff2400] shrink-0 mt-0.5" />
              <span>Canal direto com os fundadores e suporte prioritário para novos recursos de agendamento.</span>
            </li>
          </ul>

          <div className="rounded-xl border border-[#2D2D2D] bg-[#141414] p-5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#faf3e0]">
              <MapPin className="w-4 h-4 text-[#ff2400]" />
              <span>Como seu espaço aparece no aplicativo:</span>
            </div>
            <p className="text-[11px] text-[#A1A1A1] leading-relaxed">
              Jogadores da sua cidade visualizam sua loja, comodidades, quantidade de mesas disponíveis e podem solicitar reservas sem intermediários.
            </p>
            <div className="w-full max-w-[218px] mx-auto p-2 rounded-xl bg-black border border-[#2D2D2D]">
              <div className="relative w-full aspect-[450/919] rounded-lg overflow-hidden">
                <Image
                  src="/app-screens/spaces.png"
                  alt="Exibição de Espaços no App TableForge"
                  fill
                  sizes="210px"
                  className="object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 bg-[#1E1E1E] border border-[#2D2D2D] rounded-xl p-6 sm:p-8">
          {isSubmitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-12 h-12 rounded-full bg-green-950/60 border border-green-500/40 text-green-400 flex items-center justify-center mx-auto">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#faf3e0]">Inscrição Enviada com Sucesso!</h3>
              <p className="text-xs sm:text-sm text-[#A1A1A1] max-w-md mx-auto">
                Obrigado pelo interesse! Nossa equipe entrará em contato em até 48 horas para apresentar a demonstração ao vivo e entregar seu kit.
              </p>
              <Button size="sm" variant="outline" onClick={() => setIsSubmitted(false)}>
                Enviar outra candidatura
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-[#faf3e0]">Candidatura de Parceiro</h3>
                <p className="text-xs text-[#A1A1A1]">
                  Preencha os dados básicos do seu espaço ou evento para agendarmos uma conversa.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="type" className="block text-xs font-medium text-[#D1D1D1]">
                    Tipo de Parceria
                  </label>
                  <select
                    id="type"
                    className="w-full bg-[#1E1E1E] text-[#faf3e0] border border-[#3a3a3a] rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#ff2400] focus:ring-1 focus:ring-[#ff2400]"
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
                  <Send className="w-4 h-4" />
                  <span>Submeter Candidatura de Parceiro</span>
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
