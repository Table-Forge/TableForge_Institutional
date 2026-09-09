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
  Beer: <Beer className="w-5 h-5 text-[#ff2400]" />,
  Compass: <Compass className="w-5 h-5 text-[#ff2400]" />,
  BookOpen: <BookOpen className="w-5 h-5 text-[#ff2400]" />,
  Dice6: <Dice6 className="w-5 h-5 text-[#ff2400]" />,
  Sparkles: <Sparkles className="w-5 h-5 text-[#ff2400]" />,
  MapPin: <MapPin className="w-5 h-5 text-[#ff2400]" />,
  Hammer: <Hammer className="w-5 h-5 text-[#ff2400]" />,
};

export function CategoryCard({ category }: ICategoryCard) {
  const icon = iconMap[category.icon] || <MessageSquare className="w-5 h-5 text-[#ff2400]" />;

  return (
    <Link
      href={`/taverna/${category.slug}`}
      className="group bg-[#1E1E1E] border border-[#2D2D2D] hover:border-[#ff2400]/50 rounded-xl p-5 transition-all duration-200 hover:shadow-lg hover:shadow-[#ff2400]/5 flex flex-col justify-between"
    >
      <div className="space-y-3">
        <div className="w-10 h-10 rounded-lg bg-[#2D2D2D] border border-[#3a3a3a] group-hover:border-[#ff2400]/40 flex items-center justify-center transition-colors">
          {icon}
        </div>
        <div>
          <h3 className="text-base font-bold text-[#faf3e0] group-hover:text-[#ff2400] transition-colors">
            {category.name}
          </h3>
          <p className="text-xs text-[#A1A1A1] mt-1 leading-relaxed line-clamp-2">
            {category.description}
          </p>
        </div>
      </div>

      <div className="pt-4 mt-4 border-t border-[#2D2D2D] flex items-center justify-between text-xs text-[#717171]">
        <span className="flex items-center gap-1">
          <FileText className="w-3.5 h-3.5" />
          <strong className="text-[#D1D1D1]">{category.topicsCount}</strong> tópicos
        </span>
        <span className="flex items-center gap-1">
          <MessageSquare className="w-3.5 h-3.5" />
          <strong className="text-[#D1D1D1]">{category.repliesCount}</strong> respostas
        </span>
      </div>
    </Link>
  );
}
