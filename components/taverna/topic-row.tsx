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
    <div className="group bg-[#1E1E1E] border border-[#2D2D2D] hover:border-[#ff2400]/40 rounded-xl p-4 lg:p-5 transition-all duration-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-start gap-3.5 flex-1 min-w-0">
        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-[#2D2D2D] shrink-0 border border-[#3a3a3a]">
          <Image
            src={topic.author.avatarUrl}
            alt={topic.author.nickname}
            fill
            className="object-cover"
          />
        </div>

        <div className="space-y-1.5 min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            {topic.isPinned && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#ff2400] bg-[#ff2400]/10 px-2 py-0.5 rounded">
                <Pin className="w-3 h-3" />
                Fixado
              </span>
            )}
            {topic.isLocked && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#A1A1A1] bg-[#2D2D2D] px-2 py-0.5 rounded">
                <Lock className="w-3 h-3" />
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
            <h4 className="text-sm lg:text-base font-bold text-[#faf3e0] group-hover:text-[#ff2400] transition-colors line-clamp-1">
              {topic.title}
            </h4>
          </Link>

          <div className="flex flex-wrap items-center gap-2 text-xs text-[#A1A1A1]">
            <span className="font-medium text-[#D1D1D1]">{topic.author.nickname}</span>
            {topic.author.badge && (
              <Badge tavernaBadge={topic.author.badge} size="sm" />
            )}
            <span>•</span>
            <span className="text-[#717171]">{formattedDate}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 sm:gap-6 text-xs text-[#A1A1A1] self-end sm:self-center shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#2D2D2D] w-full sm:w-auto justify-end">
        <span className="flex items-center gap-1 text-[#D1D1D1]" title="Respostas">
          <MessageSquare className="w-4 h-4 text-[#ff2400]" />
          <strong>{topic.replyCount}</strong>
        </span>
        <span className="flex items-center gap-1" title="Upvotes">
          <ThumbsUp className="w-3.5 h-3.5 text-[#A1A1A1]" />
          {topic.upvoteCount}
        </span>
        <span className="flex items-center gap-1" title="Visualizações">
          <Eye className="w-3.5 h-3.5 text-[#717171]" />
          {topic.viewCount}
        </span>
      </div>
    </div>
  );
}
