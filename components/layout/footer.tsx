import React from "react";
import Link from "next/link";
import { Mail, Heart } from "lucide-react";
import { GithubIcon, TwitterIcon, InstagramIcon, KeystoneIcon } from "@/components/ui/icons";
import { Logo } from "@/components/ui/logo";
import { AppDownloadButtons } from "@/components/ui/app-download-buttons";
import { ForgeDivider } from "@/components/ui/forge-divider";

const ECOSYSTEM_LINKS = [
  { href: "/sobre", label: "Sobre a Forja" },
  { href: "/equipe", label: "Nossa Equipe" },
  { href: "/para-lojas", label: "Lojas & Espaços Parceiros" },
  { href: "/taverna", label: "A Taverna (Fórum da Comunidade)" },
];

const CONTENT_LINKS = [
  { href: "/blog", label: "Blog & Guias de Mestre" },
  { href: "/taverna/procuro-mesa", label: "Procuro Mesa de RPG" },
  { href: "/taverna/sistemas", label: "Debates de Sistemas" },
  { href: "/taverna/mestres-narradores", label: "Dicas para Narradores" },
];

const SOCIAL_LINKS = [
  { href: "https://instagram.com", label: "Instagram", Icon: InstagramIcon },
  { href: "https://x.com", label: "Twitter / X", Icon: TwitterIcon },
  { href: "https://github.com", label: "GitHub", Icon: GithubIcon },
  { href: "mailto:contato@tableforge.com.br", label: "E-mail", Icon: Mail },
];

interface IFooterHeading {
  children: React.ReactNode;
}

function FooterHeading({ children }: IFooterHeading) {
  return (
    <h4 className="mb-4 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#faf3e0]">
      <KeystoneIcon className="h-3 w-3 text-[#ff2400]" aria-hidden="true" />
      {children}
    </h4>
  );
}

export function Footer() {
  return (
    <footer className="stone-pattern relative mt-auto border-t border-[#2D2D2D] text-[#D1D1D1]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_30%,rgba(0,0,0,0.75)_100%)]"
      />
      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4 lg:gap-12">
          <div className="space-y-4">
            <Link href="/" className="inline-block drop-shadow-[0_0_18px_rgba(255,36,0,0.35)]">
              <Logo variant="split" />
            </Link>
            <p className="text-xs leading-relaxed text-[#A1A1A1]">
              O ponto de encontro do RPG e jogos de tabuleiro. Encontre jogadores por geolocalização e reserve mesas em lojas parceiras direto no aplicativo.
            </p>
            <div className="flex items-center gap-2">
              {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                <a
                  key={href}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                  className="flex h-8 w-8 items-center justify-center chamfer-sm bg-[#121214] text-[#A1A1A1] ring-1 ring-inset ring-[#2a2a30] transition-colors hover:text-[#ff2400] hover:ring-[#ff2400]/60"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <FooterHeading>Ecossistema</FooterHeading>
            <ul className="space-y-2 text-xs">
              {ECOSYSTEM_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-[#faf3e0]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <FooterHeading>Conteúdo & Fórum</FooterHeading>
            <ul className="space-y-2 text-xs">
              {CONTENT_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-[#faf3e0]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <FooterHeading>Baixe o aplicativo</FooterHeading>
            <p className="text-xs leading-relaxed text-[#A1A1A1]">
              Encontre jogadores e campanhas ativas no seu bairro diretamente pelo app.
            </p>
            <AppDownloadButtons size="sm" />
            <div className="pt-2">
              <Link
                href="/para-lojas"
                className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#ff5a36] transition-colors hover:text-[#faf3e0]"
              >
                Seja um Parceiro Fundador
                <KeystoneIcon className="h-2.5 w-2.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>

        <ForgeDivider label="TableForge" className="mt-12" />

        <div className="mt-6 flex flex-col items-center justify-between gap-4 text-xs text-[#717171] sm:flex-row">
          <p>© {new Date().getFullYear()} TableForge. Todos os direitos reservados.</p>
          <p className="flex items-center gap-1">
            Forjado com <Heart className="h-3.5 w-3.5 fill-[#ff2400] text-[#ff2400]" /> para a comunidade de RPG e jogos de mesa.
          </p>
        </div>
      </div>
    </footer>
  );
}
