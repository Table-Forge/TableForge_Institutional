import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AuthProvider } from "@/context/auth-context";
import { AuthModal } from "@/components/auth/auth-modal";

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
    <html lang="pt-BR" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#000000] text-[#faf3e0]">
        <AuthProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <AuthModal />
          <div id="root-portal" />
        </AuthProvider>
      </body>
    </html>
  );
}
