import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ITavernaTopic } from "@/schemas/taverna.schema";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, ThumbsUp, Eye, Pin, Lock } from "lucide-react";

export interface ITopicRow {
  topic: ITavernaTopic;
  showCategory?: boolean;
}

export function TopicRow({ topic, showCategory = true }: ITopicRow) {
  const formattedDate = new Date(topic.createdAtUtc).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
  });

  return (
    <div className="group relative flex flex-col gap-4 border-l-2 border-[#2D2D2D] bg-[#0f0f12] py-4 pl-5 pr-4 transition-colors hover:border-[#ff2400] sm:flex-row sm:items-center sm:justify-between lg:pl-6 lg:pr-5">
      <span
        aria-hidden="true"
        className="absolute -left-[5px] top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[#3a3a3a] transition-colors group-hover:bg-[#ff2400]"
      />

      <div className="flex min-w-0 flex-1 items-start gap-3.5">
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-[#3a3a3a] bg-[#2D2D2D]">
          <Image
            src={topic.author.avatarUrl}
            alt={topic.author.nickname}
            fill
            sizes="40px"
            className="object-cover"
          />
        </div>

        <div className="min-w-0 flex-1 space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            {topic.isPinned && (
              <span className="inline-flex items-center gap-1 chamfer-sm bg-[#ff2400] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.15em] text-white">
                <Pin className="h-3 w-3" />
                Fixado
              </span>
            )}
            {topic.isLocked && (
              <span className="inline-flex items-center gap-1 chamfer-sm bg-[#2D2D2D] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.15em] text-[#A1A1A1]">
                <Lock className="h-3 w-3" />
                Trancado
              </span>
            )}
            {showCategory && (
              <Link href={`/taverna/${topic.categorySlug}`}>
                <Badge variant="secondary" className="hover:border-[#ff2400]/40">
                  {topic.categoryName}
                </Badge>
              </Link>
            )}
          </div>

          <Link href={`/taverna/topico/${topic.slug}`}>
            <h4 className="text-sm font-bold text-[#faf3e0] transition-colors group-hover:text-[#ff5a36] line-clamp-1 lg:text-base">
              {topic.title}
            </h4>
          </Link>

          <div className="flex flex-wrap items-center gap-2 text-xs text-[#A1A1A1]">
            <span className="font-medium text-[#D1D1D1]">{topic.author.nickname}</span>
            {topic.author.badge && (
              <Badge tavernaBadge={topic.author.badge} size="sm" />
            )}
            <span className="text-[#717171]">·</span>
            <span className="text-[#717171]">{formattedDate}</span>
          </div>
        </div>
      </div>

      <div className="flex w-full shrink-0 items-center justify-end gap-4 border-t border-[#2D2D2D] pt-2 text-xs text-[#A1A1A1] sm:w-auto sm:gap-6 sm:border-t-0 sm:pt-0">
        <span className="flex items-center gap-1 text-[#D1D1D1]" title="Respostas">
          <MessageSquare className="h-4 w-4 text-[#ff2400]" />
          <strong>{topic.replyCount}</strong>
        </span>
        <span className="flex items-center gap-1" title="Upvotes">
          <ThumbsUp className="h-3.5 w-3.5 text-[#A1A1A1]" />
          {topic.upvoteCount}
        </span>
        <span className="flex items-center gap-1" title="Visualizações">
          <Eye className="h-3.5 w-3.5 text-[#717171]" />
          {topic.viewCount}
        </span>
      </div>
    </div>
  );
}
