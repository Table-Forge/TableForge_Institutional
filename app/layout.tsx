import type { Metadata } from "next";
import { Cinzel, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { QueryProvider } from "@/components/providers/query-provider";
import { AuthProvider } from "@/context/auth-context";
import { AuthModal } from "@/components/auth/auth-modal";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const cinzel = Cinzel({ subsets: ["latin"], weight: "variable", variable: "--font-cinzel", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "TableForge | O Ponto de Encontro do RPG",
    template: "%s | TableForge",
  },
  description:
    "Portal oficial do TableForge. Conectando jogadores, mestres, lojas e eventos de RPG, board games e TCG em um único ecossistema.",
  keywords: [
    "RPG de mesa",
    "encontrar jogadores de RPG",
    "board games",
    "TCG",
    "A Taverna TableForge",
    "lojas de RPG",
    "eventos geek",
  ],
  authors: [{ name: "TableForge" }],
  openGraph: {
    title: "TableForge | O Ponto de Encontro do RPG",
    description:
      "Conectando jogadores, mestres, lojas e eventos de RPG e board games em um único ecossistema.",
    url: "https://tableforge.com.br",
    siteName: "TableForge",
    locale: "pt_BR",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`h-full antialiased ${inter.variable} ${cinzel.variable}`}>
      <body className="min-h-full flex flex-col bg-[#000000] text-[#faf3e0]">
        <QueryProvider>
          <AuthProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <AuthModal />
            <div id="root-portal" />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
