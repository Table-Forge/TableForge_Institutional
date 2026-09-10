"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Users, MapPin, Calendar, Smartphone } from "lucide-react";

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

export function AppPreviewMockup() {
  const [activeScreenId, setActiveScreenId] = useState("campaigns");

  const activeScreen =
    SCREENS.find((screen) => screen.id === activeScreenId) ?? SCREENS[0];

  return (
    <div className="flex flex-col items-center w-full max-w-sm mx-auto">
      <div className="flex items-center gap-1.5 p-1 bg-[#1E1E1E] border border-[#2D2D2D] rounded-full mb-4 w-full justify-between">
        {SCREENS.map((screen) => {
          const Icon = screen.icon;
          const isActive = screen.id === activeScreenId;
          return (
            <button
              key={screen.id}
              onClick={() => setActiveScreenId(screen.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                isActive
                  ? "bg-[#ff2400] text-white shadow-md shadow-[#ff2400]/30"
                  : "text-[#A1A1A1] hover:text-[#faf3e0] hover:bg-[#2D2D2D]"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{screen.shortLabel}</span>
            </button>
          );
        })}
      </div>

      <div className="relative w-full rounded-[2.5rem] p-2.5 bg-gradient-to-b from-[#3a3a3a] via-[#1E1E1E] to-[#0A0A0A] border-2 border-[#ff2400]/40 shadow-2xl shadow-[#ff2400]/20">
        <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-4 bg-[#0A0A0A] rounded-full z-20 border border-[#2D2D2D]/60 flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-[#1A1A1A] mr-2" />
          <div className="w-2 h-2 rounded-full bg-[#ff2400]/60" />
        </div>

        <div className="relative w-full aspect-[450/915] rounded-[2rem] overflow-hidden bg-[#0A0A0A] border border-[#1E1E1E]">
          <Image
            src={activeScreen.src}
            alt={activeScreen.label}
            fill
            sizes="(max-width: 640px) 320px, 380px"
            priority
            className="object-cover object-top"
          />
        </div>

        <div className="mt-3 px-2 flex items-center justify-between text-[11px] text-[#A1A1A1]">
          <span className="font-semibold text-[#faf3e0] flex items-center gap-1">
            <Smartphone className="w-3 h-3 text-[#ff2400]" />
            {activeScreen.label}
          </span>
          <span className="text-[10px] text-[#717171]">App Oficial</span>
        </div>
      </div>
    </div>
  );
}
