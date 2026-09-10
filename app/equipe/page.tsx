import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { initialTeamMembers } from "@/data/team.mock";
import { Users, Dice6, Flame } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Equipe | Quem Forja o TableForge",
  description: "Conheça os fundadores, desenvolvedores e designers por trás do TableForge.",
};

export default function EquipePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 space-y-16">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <Badge variant="primary" className="mx-auto">
          <Users className="w-3.5 h-3.5" />
          <span>Ferreiros da Mesa</span>
        </Badge>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#faf3e0] tracking-tight">
          Quem Forja o TableForge
        </h1>
        <p className="text-sm sm:text-base text-[#A1A1A1] leading-relaxed">
          Somos narradores, jogadores de tabuleiro e engenheiros de software unidos para criar o produto que sempre sonhamos ter nas nossas sextas-feiras à noite.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {initialTeamMembers.map((member) => (
          <Card key={member.id} variant="surface" className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden bg-[#1E1E1E] shrink-0 border border-[#3a3a3a]">
              <Image
                src={member.avatarUrl}
                alt={member.name}
                fill
                className="object-cover rounded-full"
              />
            </div>

            <div className="space-y-3 flex-1 min-w-0">
              <div>
                <h3 className="text-lg font-bold text-[#faf3e0]">{member.name}</h3>
                <p className="text-xs font-semibold text-[#ff2400]">{member.role}</p>
              </div>

              <p className="text-xs text-[#A1A1A1] leading-relaxed">
                {member.bio}
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-[#3a3a3a] text-xs">
                <span className="text-[#717171] flex items-center gap-1">
                  <Dice6 className="w-3.5 h-3.5 text-[#ff2400]" />
                  Jogo favorito: <strong className="text-[#D1D1D1]">{member.favoriteSystemOrGame}</strong>
                </span>

                <div className="flex items-center gap-2 text-[#A1A1A1]">
                  {member.githubUrl && (
                    <a
                      href={member.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-[#faf3e0] transition-colors"
                      aria-label="GitHub"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  )}
                  {member.linkedinUrl && (
                    <a
                      href={member.linkedinUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-[#faf3e0] transition-colors"
                      aria-label="LinkedIn"
                    >
                      <LinkedinIcon className="w-4 h-4" />
                    </a>
                  )}
                  {member.twitterUrl && (
                    <a
                      href={member.twitterUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-[#faf3e0] transition-colors"
                      aria-label="Twitter / X"
                    >
                      <TwitterIcon className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="bg-[#1E1E1E] border border-[#2D2D2D] rounded-2xl p-8 text-center space-y-4">
        <Flame className="w-8 h-8 text-[#ff2400] mx-auto fill-[#ff2400]/20" />
        <h3 className="text-xl font-bold text-[#faf3e0]">
          Construindo em Público com a Comunidade
        </h3>
        <p className="text-xs sm:text-sm text-[#A1A1A1] max-w-xl mx-auto leading-relaxed">
          Acreditamos em transparência radical. Cada funcionalidade da Beta é discutida e testada diretamente com os usuários no fórum da Forja.
        </p>
        <div className="pt-2">
          <Link href="/taverna/table-forge">
            <Button variant="primary" size="md">
              Acompanhar Atualizações d&apos;A Forja
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
