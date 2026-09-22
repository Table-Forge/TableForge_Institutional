import React from "react";
import Link from "next/link";
import { ITavernaCategory } from "@/schemas/taverna.schema";
import {
  Beer,
  Compass,
  BookOpen,
  Dice6,
  Sparkles,
  MapPin,
  Hammer,
  MessageSquare,
  FileText,
} from "lucide-react";

export interface ICategoryCard {
  category: ITavernaCategory;
}

const iconMap: Record<string, React.ReactNode> = {
  Beer: <Beer className="h-5 w-5 text-[#ffb700]" />,
  Compass: <Compass className="h-5 w-5 text-[#ffb700]" />,
  BookOpen: <BookOpen className="h-5 w-5 text-[#ffb700]" />,
  Dice6: <Dice6 className="h-5 w-5 text-[#ffb700]" />,
  Sparkles: <Sparkles className="h-5 w-5 text-[#ffb700]" />,
  MapPin: <MapPin className="h-5 w-5 text-[#ffb700]" />,
  Hammer: <Hammer className="h-5 w-5 text-[#ffb700]" />,
};

const NAIL_POSITIONS = ["left-3 top-3", "right-3 top-3", "left-3 bottom-3", "right-3 bottom-3"];

export function CategoryCard({ category }: ICategoryCard) {
  const icon = iconMap[category.icon] || <MessageSquare className="h-5 w-5 text-[#ffb700]" />;

  return (
    <Link href={`/taverna/${category.slug}`} className="group flex h-full flex-col">
      <div className="mx-auto flex h-7 w-6 justify-around" aria-hidden="true">
        <span className="h-full w-px bg-[#3a3a3a]" />
        <span className="h-full w-px bg-[#3a3a3a]" />
      </div>
      <div className="flex-1 origin-top chamfer-md bg-[#0f0806] p-px transition-transform duration-300 group-hover:rotate-1">
        <div className="relative flex h-full flex-col justify-between gap-4 chamfer-md bg-[#1e130f] bg-[repeating-linear-gradient(90deg,transparent_0,transparent_46px,rgba(0,0,0,0.28)_46px,rgba(0,0,0,0.28)_48px)] p-5">
          {NAIL_POSITIONS.map((position) => (
            <span
              key={position}
              aria-hidden="true"
              className={`absolute ${position} h-1.5 w-1.5 rounded-full bg-[#4a4a4a] shadow-[0_1px_0_rgba(0,0,0,0.6)]`}
            />
          ))}

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center chamfer-sm bg-[#0b0b0d]/60 ring-1 ring-inset ring-[#faf3e0]/10">
                {icon}
              </div>
              <h3 className="font-display text-sm font-bold uppercase tracking-[0.05em] text-[#faf3e0] transition-colors group-hover:text-[#ffb700]">
                {category.name}
              </h3>
            </div>
            <p className="text-xs leading-relaxed text-[#D1D1D1]/70 line-clamp-2">{category.description}</p>
          </div>

          <div className="flex items-center justify-between border-t border-[#faf3e0]/10 pt-3 text-[10px] uppercase tracking-[0.15em] text-[#A1A1A1]">
            <span className="flex items-center gap-1">
              <FileText className="h-3.5 w-3.5" />
              <strong className="text-[#faf3e0]">{category.topicsCount}</strong> tópicos
            </span>
            <span className="flex items-center gap-1">
              <MessageSquare className="h-3.5 w-3.5" />
              <strong className="text-[#faf3e0]">{category.repliesCount}</strong> respostas
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
