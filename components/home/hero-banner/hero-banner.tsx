"use client";

import React, { useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import {
  Flame,
  MessageSquare,
  RotateCcw,
  Smartphone,
  Volume2,
  VolumeX,
} from "lucide-react";
import { AppDownloadButtons } from "@/components/ui/app-download-buttons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ForgeCurtain } from "./forge-curtain";
import {
  getForgeMuted,
  getForgeMutedOnServer,
  setForgeMuted,
  subscribeForgeMuted,
} from "./forge-audio";
import { ForgeScene } from "./forge-scene";
import {
  clearForgeStory,
  useForgeScrollytelling,
} from "./use-forge-scrollytelling";

export function HeroBanner() {
  const rootRef = useRef<HTMLElement>(null);
  const [replayToken, setReplayToken] = useState(0);
  const isMuted = useSyncExternalStore(
    subscribeForgeMuted,
    getForgeMuted,
    getForgeMutedOnServer,
  );

  useForgeScrollytelling(rootRef, replayToken);

  const handleReplay = () => {
    window.scrollTo(0, 0);
    clearForgeStory();
    setReplayToken((token) => token + 1);
  };

  const handleToggleSound = () => {
    setForgeMuted(!isMuted);
  };

  const soundLabel = isMuted
    ? "Ativar o som da animação"
    : "Desativar o som da animação";

  return (
    <section
      ref={rootRef}
      className="relative isolate h-svh min-h-[560px] w-full select-none overflow-hidden border-b border-[#1E1E1E] bg-[#000000]"
    >
      <ForgeScene key={`scene-${replayToken}`} />

      <div
        data-forge="content"
        className="relative z-10 flex h-full w-full flex-col justify-center px-4 sm:px-6 lg:px-8
        bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.75)_0%,rgba(0,0,0,0.35)_45%,transparent_72%)] lg:bg-[linear-gradient(90deg,rgba(0,0,0,0.82)_0%,rgba(0,0,0,0.5)_40%,transparent_68%)]
        "
      >
        <div className="pointer-events-none absolute inset-0 mx-auto flex h-full max-w-7xl items-center pt-20 lg:pt-24">
          <div className="relative max-w-xl space-y-6 text-center lg:text-left">
            <Badge variant="primary" size="md">
              <Smartphone className="h-3.5 w-3.5 text-[#ff2400]" />
              <span>App oficial para iOS e Android</span>
            </Badge>

            <h1 className="font-display text-3xl font-bold uppercase leading-[1.1] tracking-[0.02em] text-[#faf3e0] sm:text-4xl xl:text-5xl">
              Entre na forja do RPG. <br />
              <span className="bg-gradient-to-r from-[#ff2400] via-[#ff5a36] to-[#faf3e0] bg-clip-text text-transparent">
                Sua party te espera no app.
              </span>
            </h1>

            <p className="mx-auto max-w-xl text-base leading-relaxed text-[#D1D1D1] sm:text-lg lg:mx-0">
              O TableForge é o app por geolocalização que conecta você a
              jogadores, mestres e mesas em lojas físicas parceiras. Defina seu
              raio de busca e forje novas campanhas.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 pt-2 sm:flex-row lg:justify-start">
              <AppDownloadButtons size="md" />
              <Link href="/taverna">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-[#3a3a3a] bg-black/60 hover:bg-[#1E1E1E] sm:w-auto"
                >
                  <MessageSquare className="h-4 w-4 text-[#ff2400]" />
                  <span>Visitar A Taverna</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <ForgeCurtain key={`curtain-${replayToken}`} />

      <div
        data-forge="hud"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-40 opacity-0"
      >
        <span className="absolute left-4 top-4 h-8 w-8 border-l border-t border-[#faf3e0]/25" />
        <span className="absolute right-4 top-4 h-8 w-8 border-r border-t border-[#faf3e0]/25" />
        <span className="absolute bottom-4 left-4 h-8 w-8 border-b border-l border-[#faf3e0]/25" />
        <span className="absolute bottom-4 right-4 h-8 w-8 border-b border-r border-[#faf3e0]/25" />
      </div>

      <div
        data-forge="controls"
        className="absolute bottom-4 right-14 z-40 flex items-center gap-2 opacity-0 sm:bottom-6 sm:right-16"
      >
        <Button
          size="xs"
          variant="outline"
          onClick={handleReplay}
          aria-label="Rever a animação da forja"
          title="Rever a animação da forja"
          className="border-[#3a3a3a] bg-black/60 px-2 text-[#D1D1D1] hover:bg-[#1E1E1E] hover:text-[#faf3e0] motion-reduce:hidden"
        >
          <RotateCcw className="h-3.5 w-3.5 text-[#ff2400]" />
        </Button>
        <Button
          size="xs"
          variant="outline"
          onClick={handleToggleSound}
          aria-label={soundLabel}
          title={soundLabel}
          className="border-[#3a3a3a] bg-black/60 px-2 text-[#D1D1D1] hover:bg-[#1E1E1E] hover:text-[#faf3e0]"
        >
          {isMuted ? (
            <VolumeX className="h-3.5 w-3.5" />
          ) : (
            <Volume2 className="h-3.5 w-3.5 text-[#ff2400]" />
          )}
        </Button>
      </div>

      <div
        data-forge="scroll-prompt"
        className="pointer-events-none absolute bottom-6 left-1/2 z-40 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#ff5a36]">
          <Flame className="h-3.5 w-3.5 animate-pulse text-[#ff2400]" />
          Role para acender a forja
        </span>
        <div className="flex h-8 w-5 items-start justify-center rounded-full border-2 border-[#ff2400]/40 p-1">
          <div className="h-2 w-1.5 animate-bounce rounded-full bg-[#ff2400]" />
        </div>
      </div>

      <div
        data-forge="veil"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-50 bg-[#000000]"
      />
    </section>
  );
}
