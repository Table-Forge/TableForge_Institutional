"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Users, MapPin, Calendar, Smartphone } from "lucide-react";
import { FORGE_COLORS as C } from "@/constants/forge-colors";

interface IScreenOption {
  id: string;
  label: string;
  shortLabel: string;
  src: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const SCREENS: IScreenOption[] = [
  {
    id: "campaigns",
    label: "Campanhas & Matchmaking",
    shortLabel: "Campanhas",
    src: "/app-screens/campaigns.png",
    icon: Users,
    description: "Crie ou encontre mesas por geolocalização",
  },
  {
    id: "spaces",
    label: "Espaços & Lojas Parceiras",
    shortLabel: "Lojas & Espaços",
    src: "/app-screens/spaces.png",
    icon: MapPin,
    description: "Mesas reserváveis e infraestrutura completa",
  },
  {
    id: "events",
    label: "Eventos & Torneios",
    shortLabel: "Eventos",
    src: "/app-screens/events.png",
    icon: Calendar,
    description: "One-shots e encontros presenciais",
  },
];

const STAND_RIVETS = [40, 100, 220, 280];

function IronStand() {
  return (
    <svg viewBox="0 0 320 96" aria-hidden="true" className="relative -mt-8 block w-full">
      <path d="M96 0 H224 L236 40 H84 Z" fill={C.stoneMid} stroke={C.outline} strokeWidth={3} strokeLinejoin="round" />
      <rect x={16} y={40} width={288} height={18} fill={C.iron} stroke={C.outline} strokeWidth={3} />
      <path d="M16 58 H304 L316 88 H4 Z" fill={C.stoneLight} stroke={C.outline} strokeWidth={3} strokeLinejoin="round" />
      <path d="M22 62 H298" stroke={C.ironHighlight} strokeWidth={2} strokeOpacity={0.6} />
      {STAND_RIVETS.map((x) => (
        <circle key={x} cx={x} cy={49} r={3.5} fill={C.ironLight} stroke={C.outline} strokeWidth={1.5} />
      ))}
      <path d="M160 66 l7 10 -7 10 -7 -10 z" fill={C.crimson} stroke={C.outline} strokeWidth={2} strokeLinejoin="round" />
    </svg>
  );
}

export function AppPreviewMockup() {
  const [activeScreenId, setActiveScreenId] = useState("campaigns");

  const activeScreen =
    SCREENS.find((screen) => screen.id === activeScreenId) ?? SCREENS[0];

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col items-center">
      <div className="mb-5 flex w-full items-center gap-1 chamfer-sm bg-[#121214] p-1 ring-1 ring-inset ring-[#2a2a30]">
        {SCREENS.map((screen) => {
          const Icon = screen.icon;
          const isActive = screen.id === activeScreenId;
          return (
            <button
              key={screen.id}
              onClick={() => setActiveScreenId(screen.id)}
              className={`flex flex-1 items-center justify-center gap-1.5 chamfer-sm px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] transition-colors ${
                isActive ? "bg-[#ff2400] text-white" : "text-[#A1A1A1] hover:bg-[#1E1E1E] hover:text-[#faf3e0]"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{screen.shortLabel}</span>
            </button>
          );
        })}
      </div>

      <div className="relative z-10 w-full rounded-[2.5rem] border-2 border-[#3a3a3a] bg-black p-3.5 shadow-[0_30px_60px_rgba(0,0,0,0.65)]">
        <div className="absolute left-1/2 top-6 z-20 flex h-4 w-24 -translate-x-1/2 items-center justify-center rounded-full border border-[#2D2D2D] bg-black">
          <div className="mr-2 h-2.5 w-2.5 rounded-full bg-[#1A1A1A]" />
          <div className="h-2 w-2 rounded-full bg-[#ff2400]/60" />
        </div>

        <div className="relative aspect-[450/915] w-full overflow-hidden rounded-[1.85rem] bg-black">
          <Image
            src={activeScreen.src}
            alt={activeScreen.label}
            fill
            sizes="(max-width: 640px) 320px, 380px"
            priority
            className="object-cover object-top"
          />
        </div>
      </div>

      <IronStand />

      <div className="mt-2 flex w-full items-center justify-between px-2 text-[11px] text-[#A1A1A1]">
        <span className="flex items-center gap-1 font-semibold text-[#faf3e0]">
          <Smartphone className="h-3 w-3 text-[#ff2400]" />
          {activeScreen.label}
        </span>
        <span className="text-[10px] uppercase tracking-[0.2em] text-[#717171]">App oficial</span>
      </div>
    </div>
  );
}
