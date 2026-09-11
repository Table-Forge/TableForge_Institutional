"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ITavernaReply } from "@/schemas/taverna.schema";
import { Badge } from "@/components/ui/badge";
import { ThumbsUp } from "lucide-react";

export interface IReplyItem {
  reply: ITavernaReply;
}

export function ReplyItem({ reply }: IReplyItem) {
  const [upvotes, setUpvotes] = useState(reply.upvoteCount);
  const [hasVoted, setHasVoted] = useState(false);

  const formattedDate = new Date(reply.createdAtUtc).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleToggleVote = () => {
    if (hasVoted) {
      setUpvotes((prev) => prev - 1);
      setHasVoted(false);
    } else {
      setUpvotes((prev) => prev + 1);
      setHasVoted(true);
    }
  };

  return (
    <div className="bg-[#1E1E1E] border border-[#2D2D2D] rounded-xl p-5 lg:p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 rounded-full overflow-hidden bg-[#2D2D2D] border border-[#3a3a3a]">
            <Image
              src={reply.author.avatarUrl}
              alt={reply.author.nickname}
              fill
              sizes="32px"
              className="object-cover"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-bold text-[#faf3e0]">
              {reply.author.nickname}
            </span>
            {reply.author.badge && (
              <Badge tavernaBadge={reply.author.badge} size="sm" />
            )}
          </div>
        </div>

        <span className="text-xs text-[#717171]">{formattedDate}</span>
      </div>

      <div className="text-sm text-[#D1D1D1] leading-relaxed pl-11 whitespace-pre-line">
        {reply.content}
      </div>

      <div className="pl-11 pt-2 flex items-center justify-between">
        <button
          onClick={handleToggleVote}
          className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md transition-colors ${
            hasVoted
              ? "bg-[#ff2400]/20 text-[#ff2400] font-semibold"
              : "bg-[#2D2D2D] text-[#A1A1A1] hover:text-[#faf3e0]"
          }`}
        >
          <ThumbsUp className="w-3 h-3" />
          <span>{upvotes}</span>
        </button>
      </div>
    </div>
  );
}
