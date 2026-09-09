import React from "react";
import Link from "next/link";
import { Flame, Mail, Heart } from "lucide-react";
import { GithubIcon, TwitterIcon, InstagramIcon } from "@/components/ui/icons";

export function Footer() {
  return (
    <footer className="border-t border-[#2D2D2D] bg-[#000000] text-[#D1D1D1] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#ff2400]/15 border border-[#ff2400]/40 flex items-center justify-center text-[#ff2400]">
                <Flame className="w-4 h-4 fill-[#ff2400]" />
              </div>
              <span className="font-bold text-lg text-[#faf3e0]">TableForge</span>
            </Link>
            <p className="text-xs text-[#A1A1A1] leading-relaxed">
              O ponto de encontro do RPG e jogos de tabuleiro. Conectando jogadores, mestres, lojas e eventos em um só ecossistema.
            </p>
            <div className="flex items-center gap-3 text-[#A1A1A1]">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#ff2400] transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#ff2400] transition-colors"
                aria-label="Twitter / X"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#ff2400] transition-colors"
                aria-label="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href="mailto:contato@tableforge.com.br"
                className="hover:text-[#ff2400] transition-colors"
                aria-label="E-mail"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#faf3e0] mb-3">
              Ecossistema
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/sobre" className="hover:text-[#faf3e0] transition-colors">
                  Sobre a Forja
                </Link>
              </li>
              <li>
                <Link href="/equipe" className="hover:text-[#faf3e0] transition-colors">
                  Nossa Equipe
                </Link>
              </li>
              <li>
                <Link href="/para-lojas" className="hover:text-[#faf3e0] transition-colors">
                  Lojas & Espaços Parceiros
                </Link>
              </li>
              <li>
                <Link href="/taverna" className="hover:text-[#faf3e0] transition-colors">
                  A Taverna (Comunidade)
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#faf3e0] mb-3">
              Conteúdo & Fórum
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/blog" className="hover:text-[#faf3e0] transition-colors">
                  Blog & Guias de Mestre
                </Link>
              </li>
              <li>
                <Link href="/taverna/procuro-mesa" className="hover:text-[#faf3e0] transition-colors">
                  Procuro Mesa de RPG
                </Link>
              </li>
              <li>
                <Link href="/taverna/sistemas" className="hover:text-[#faf3e0] transition-colors">
                  Debates de Sistemas
                </Link>
              </li>
              <li>
                <Link href="/taverna/mestres-narradores" className="hover:text-[#faf3e0] transition-colors">
                  Dicas para Narradores
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#faf3e0] mb-3">
              Acesso
            </h4>
            <p className="text-xs text-[#A1A1A1] leading-relaxed mb-3">
              Entre para a Beta privada ou torne sua loja uma pioneira credenciada da nossa rede.
            </p>
            <div className="space-y-2">
              <Link
                href="/para-lojas"
                className="inline-block text-xs font-medium text-[#ff2400] hover:underline"
              >
                Seja um Parceiro Fundador →
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-[#1E1E1E] mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#717171]">
          <p>© {new Date().getFullYear()} TableForge. Todos os direitos reservados.</p>
          <p className="flex items-center gap-1">
            Forjado com <Heart className="w-3.5 h-3.5 text-[#ff2400] fill-[#ff2400]" /> para a comunidade de RPG e jogos de mesa.
          </p>
        </div>
      </div>
    </footer>
  );
}
