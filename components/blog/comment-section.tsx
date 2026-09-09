"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IBlogComment, CreateCommentSchema, ICreateCommentForm } from "@/schemas/blog.schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Send } from "lucide-react";

export interface ICommentSection {
  postId: number;
  initialComments: IBlogComment[];
}

export function CommentSection({ postId, initialComments }: ICommentSection) {
  const [comments, setComments] = useState<IBlogComment[]>(initialComments);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ICreateCommentForm>({
    resolver: zodResolver(CreateCommentSchema),
  });

  const onSubmit = (data: ICreateCommentForm) => {
    setIsSubmitting(true);
    setTimeout(() => {
      const newComment: IBlogComment = {
        id: Date.now(),
        postId,
        authorName: data.authorName,
        authorAvatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
        content: data.content,
        createdAtUtc: new Date().toISOString(),
      };
      setComments((prev) => [...prev, newComment]);
      setIsSubmitting(false);
      setSuccessMessage(true);
      reset();
      setTimeout(() => setSuccessMessage(false), 4000);
    }, 400);
  };

  return (
    <div className="pt-10 border-t border-[#2D2D2D] space-y-8">
      <div className="flex items-center gap-2">
        <MessageSquare className="w-5 h-5 text-[#ff2400]" />
        <h3 className="text-xl font-bold text-[#faf3e0]">
          Comentários ({comments.length})
        </h3>
      </div>

      <div className="bg-[#1E1E1E] border border-[#2D2D2D] rounded-xl p-6 space-y-4">
        <h4 className="text-sm font-semibold text-[#faf3e0]">Deixe seu comentário</h4>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Seu Nome ou Apelido"
            placeholder="Ex: Mestre Arcano"
            error={errors.authorName?.message}
            {...register("authorName")}
          />
          <Textarea
            label="Mensagem"
            placeholder="Compartilhe suas ideias ou dúvidas sobre este artigo..."
            rows={3}
            error={errors.content?.message}
            {...register("content")}
          />
          <div className="flex items-center justify-between">
            {successMessage ? (
              <span className="text-xs text-green-400 font-medium">
                Comentário publicado com sucesso!
              </span>
            ) : <span />}
            <Button type="submit" size="sm" isLoading={isSubmitting}>
              <Send className="w-3.5 h-3.5" />
              Publicar Comentário
            </Button>
          </div>
        </form>
      </div>

      <div className="space-y-4">
        {comments.map((comment) => {
          const date = new Date(comment.createdAtUtc).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          });

          return (
            <div
              key={comment.id}
              className="bg-[#1E1E1E] border border-[#2D2D2D] rounded-xl p-5 space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="relative w-7 h-7 rounded-full overflow-hidden bg-[#3a3a3a]">
                    <Image
                      src={comment.authorAvatarUrl}
                      alt={comment.authorName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="text-sm font-semibold text-[#faf3e0]">
                    {comment.authorName}
                  </span>
                </div>
                <span className="text-xs text-[#717171]">{date}</span>
              </div>
              <p className="text-sm text-[#D1D1D1] leading-relaxed pl-9">
                {comment.content}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
