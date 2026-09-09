"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ITavernaTopic, ITavernaReply, CreateReplySchema, ICreateReplyForm } from "@/schemas/taverna.schema";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ReplyItem } from "@/components/taverna/reply-item";
import { ArrowLeft, MessageSquare, ThumbsUp, Send, Pin, Lock } from "lucide-react";

export interface ITopicThreadView {
  topic: ITavernaTopic;
  initialReplies: ITavernaReply[];
}

export function TopicThreadView({ topic, initialReplies }: ITopicThreadView) {
  const [replies, setReplies] = useState<ITavernaReply[]>(initialReplies);
  const [topicVotes, setTopicVotes] = useState(topic.upvoteCount);
  const [hasVotedTopic, setHasVotedTopic] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formattedDate = new Date(topic.createdAtUtc).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ICreateReplyForm>({
    resolver: zodResolver(CreateReplySchema),
  });

  const handleToggleTopicVote = () => {
    if (hasVotedTopic) {
      setTopicVotes((prev) => prev - 1);
      setHasVotedTopic(false);
    } else {
      setTopicVotes((prev) => prev + 1);
      setHasVotedTopic(true);
    }
  };

  const onSubmitReply = (data: ICreateReplyForm) => {
    setIsSubmitting(true);
    setTimeout(() => {
      const newReply: ITavernaReply = {
        id: Date.now(),
        topicId: topic.id,
        author: {
          userId: 99,
          username: "aventureiro_taverna",
          nickname: "Aventureiro da Forja",
          avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
          badge: "FerreiroFundador",
        },
        content: data.content,
        upvoteCount: 0,
        createdAtUtc: new Date().toISOString(),
      };
      setReplies((prev) => [...prev, newReply]);
      setIsSubmitting(false);
      reset();
    }, 400);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-10">
      <div className="space-y-4">
        <Link
          href={`/taverna/${topic.categorySlug}`}
          className="inline-flex items-center gap-1.5 text-xs text-[#A1A1A1] hover:text-[#ff2400] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Voltar para {topic.categoryName}</span>
        </Link>

        <div className="flex flex-wrap items-center gap-2 pt-2">
          {topic.isPinned && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#ff2400] bg-[#ff2400]/15 px-2.5 py-0.5 rounded">
              <Pin className="w-3.5 h-3.5" />
              Tópico Fixado
            </span>
          )}
          {topic.isLocked && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#A1A1A1] bg-[#2D2D2D] px-2.5 py-0.5 rounded">
              <Lock className="w-3.5 h-3.5" />
              Discussão Trancada
            </span>
          )}
          <Link href={`/taverna/${topic.categorySlug}`}>
            <Badge variant="primary">{topic.categoryName}</Badge>
          </Link>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#faf3e0] tracking-tight leading-[1.2]">
          {topic.title}
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-[#2D2D2D] text-xs text-[#A1A1A1]">
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 rounded-full overflow-hidden bg-[#2D2D2D] border border-[#3a3a3a]">
              <Image
                src={topic.author.avatarUrl}
                alt={topic.author.nickname}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#faf3e0]">{topic.author.nickname}</span>
                {topic.author.badge && (
                  <Badge tavernaBadge={topic.author.badge} size="sm" />
                )}
              </div>
              <p className="text-[11px] text-[#717171]">@{topic.author.username}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs text-[#717171]">Publicado em {formattedDate}</span>
          </div>
        </div>
      </div>

      <div className="bg-[#1E1E1E] border border-[#2D2D2D] rounded-xl p-6 lg:p-8 space-y-6">
        <div className="text-sm sm:text-base text-[#D1D1D1] leading-relaxed whitespace-pre-line">
          {topic.content}
        </div>

        <div className="pt-4 border-t border-[#2D2D2D] flex items-center justify-between">
          <button
            onClick={handleToggleTopicVote}
            className={`inline-flex items-center gap-2 text-xs px-3.5 py-1.5 rounded-lg transition-colors ${
              hasVotedTopic
                ? "bg-[#ff2400]/20 text-[#ff2400] font-semibold"
                : "bg-[#2D2D2D] text-[#A1A1A1] hover:text-[#faf3e0]"
            }`}
          >
            <ThumbsUp className="w-3.5 h-3.5" />
            <span>Útil ({topicVotes})</span>
          </button>

          <span className="text-xs text-[#717171]">
            {topic.viewCount} visualizações
          </span>
        </div>
      </div>

      <div className="space-y-6 pt-4">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-[#ff2400]" />
          <h3 className="text-xl font-bold text-[#faf3e0]">
            Respostas da Comunidade ({replies.length})
          </h3>
        </div>

        {replies.length === 0 ? (
          <div className="text-center py-10 bg-[#1E1E1E] border border-[#2D2D2D] rounded-xl">
            <p className="text-sm text-[#A1A1A1]">Nenhuma resposta ainda. Compartilhe sua perspectiva!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {replies.map((reply) => (
              <ReplyItem key={reply.id} reply={reply} />
            ))}
          </div>
        )}
      </div>

      {topic.isLocked ? (
        <div className="p-4 bg-[#2D2D2D] border border-[#3a3a3a] rounded-xl text-center text-xs text-[#A1A1A1]">
          Esta discussão foi trancada pela moderação. Não é possível enviar novas respostas.
        </div>
      ) : (
        <div className="bg-[#1E1E1E] border border-[#2D2D2D] rounded-xl p-6 space-y-4">
          <h4 className="text-sm font-semibold text-[#faf3e0]">Sua Resposta</h4>
          <form onSubmit={handleSubmit(onSubmitReply)} className="space-y-4">
            <Textarea
              placeholder="Adicione seus pontos de vista, regras ou sugestões..."
              rows={4}
              error={errors.content?.message}
              {...register("content")}
            />
            <div className="flex justify-end">
              <Button type="submit" size="sm" variant="primary" isLoading={isSubmitting}>
                <Send className="w-3.5 h-3.5" />
                <span>Publicar Resposta</span>
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
