import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Dice6, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { ForgeBand } from "@/components/ui/forge-band";
import { AnvilSpot } from "@/components/ui/spot-art";
import { BehanceIcon, GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/ui/icons";
import { initialTeamMembers } from "@/data/team.mock";

export const metadata: Metadata = {
  title: "Equipe | Quem Forja o TableForge",
  description: "Conheça os fundadores, desenvolvedores e designers por trás do TableForge.",
};

export default function EquipePage() {
  return (
    <div className="pb-20">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <SectionHeading
          level="h1"
          size="lg"
          align="center"
          kicker="Ferreiros da mesa"
          title="Quem forja o TableForge"
          description="Somos narradores, jogadores de tabuleiro e engenheiros de software unidos para criar o produto que sempre sonhamos ter nas nossas sextas-feiras à noite."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          {initialTeamMembers.map((member) => (
            <Card
              key={member.id}
              variant="surface"
              className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-start sm:text-left"
            >
              <div className="relative shrink-0 pb-3">
                <div className="h-28 w-28 rounded-full p-1 ring-4 ring-[#3a3a3a] ring-offset-4 ring-offset-[#18181c]">
                  <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-[#0b0b0d] bg-[#1E1E1E]">
                    <Image
                      src={member.avatarUrl}
                      alt={member.name}
                      fill
                      sizes="112px"
                      className="rounded-full object-cover"
                    />
                  </div>
                </div>
                {member.area && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap chamfer-sm bg-[#ff2400] px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.2em] text-white">
                    {member.area}
                  </span>
                )}
              </div>

              <div className="min-w-0 flex-1 space-y-3">
                <div>
                  <h3 className="font-display text-lg font-bold uppercase tracking-[0.03em] text-[#faf3e0]">{member.name}</h3>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#ff5a36]">{member.role}</p>
                </div>

                <p className="text-xs leading-relaxed text-[#A1A1A1]">{member.bio}</p>

                <div className="flex flex-wrap items-center justify-center gap-2 border-t border-[#3a3a3a] pt-3 text-xs sm:justify-between">
                  {member.favoriteSystemOrGame ? (
                    <span className="flex items-center gap-1 text-[#717171]">
                      <Dice6 className="h-3.5 w-3.5 text-[#ff2400]" />
                      Jogo favorito: <strong className="text-[#D1D1D1]">{member.favoriteSystemOrGame}</strong>
                    </span>
                  ) : (
                    <div />
                  )}

                  <div className="flex items-center gap-2 text-[#A1A1A1]">
                    {member.portfolioUrl && (
                      <a
                        href={member.portfolioUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="transition-colors hover:text-[#faf3e0]"
                        aria-label="Portfólio"
                      >
                        <Globe className="h-4 w-4" />
                      </a>
                    )}
                    {member.githubUrl && (
                      <a
                        href={member.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="transition-colors hover:text-[#faf3e0]"
                        aria-label="GitHub"
                      >
                        <GithubIcon className="h-4 w-4" />
                      </a>
                    )}
                    {member.linkedinUrl && (
                      <a
                        href={member.linkedinUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="transition-colors hover:text-[#faf3e0]"
                        aria-label="LinkedIn"
                      >
                        <LinkedinIcon className="h-4 w-4" />
                      </a>
                    )}
                    {member.behanceUrl && (
                      <a
                        href={member.behanceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="transition-colors hover:text-[#faf3e0]"
                        aria-label="Behance"
                      >
                        <BehanceIcon className="h-4 w-4" />
                      </a>
                    )}
                    {member.twitterUrl && (
                      <a
                        href={member.twitterUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="transition-colors hover:text-[#faf3e0]"
                        aria-label="Twitter / X"
                      >
                        <TwitterIcon className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <ForgeBand>
        <div className="flex flex-col items-center gap-6 text-center">
          <AnvilSpot className="h-24 w-24" />
          <SectionHeading
            align="center"
            kicker="Transparência radical"
            title="Construindo em público com a comunidade"
            description="Cada funcionalidade da Beta é discutida e testada diretamente com os usuários no fórum da Forja."
          />
          <Link href="/taverna/table-forge">
            <Button variant="primary" size="md">
              Acompanhar atualizações d&apos;A Forja
            </Button>
          </Link>
        </div>
      </ForgeBand>
    </div>
  );
}
