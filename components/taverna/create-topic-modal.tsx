"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateTopicSchema, ICreateTopicForm, ITavernaCategory, ITavernaTopic } from "@/schemas/taverna.schema";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export interface ICreateTopicModal {
  isOpen: boolean;
  onClose: () => void;
  categories: ITavernaCategory[];
  onTopicCreated: (topic: ITavernaTopic) => void;
}

export function CreateTopicModal({
  isOpen,
  onClose,
  categories,
  onTopicCreated,
}: ICreateTopicModal) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ICreateTopicForm>({
    resolver: zodResolver(CreateTopicSchema),
    defaultValues: {
      categoryId: categories[0]?.id || 1,
    },
  });

  const onSubmit = (data: ICreateTopicForm) => {
    setIsSubmitting(true);
    const selectedCategory = categories.find((c) => c.id === Number(data.categoryId)) || categories[0];

    setTimeout(() => {
      const slug = data.title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

      const newTopic: ITavernaTopic = {
        id: Date.now(),
        categoryId: selectedCategory.id,
        categoryName: selectedCategory.name,
        categorySlug: selectedCategory.slug,
        title: data.title,
        slug: `${slug}-${Date.now().toString().slice(-4)}`,
        content: data.content,
        author: {
          userId: 99,
          username: "viajante_novo",
          nickname: "Aventureiro da Forja",
          avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
          badge: "FerreiroFundador",
        },
        viewCount: 1,
        replyCount: 0,
        upvoteCount: 1,
        isPinned: false,
        isLocked: false,
        createdAtUtc: new Date().toISOString(),
        lastActivityAtUtc: new Date().toISOString(),
      };

      onTopicCreated(newTopic);
      setIsSubmitting(false);
      reset();
      onClose();
    }, 400);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Criar Nova Discussão n'A Taverna" maxWidth="lg">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="w-full space-y-1.5">
          <label htmlFor="categoryId" className="block text-xs font-medium text-[#D1D1D1]">
            Categoria
          </label>
          <select
            id="categoryId"
            className="w-full bg-[#1E1E1E] text-[#faf3e0] border border-[#3a3a3a] rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#ff2400] focus:ring-1 focus:ring-[#ff2400]"
            {...register("categoryId", { valueAsNumber: true })}
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id} className="bg-[#1E1E1E]">
                {c.name}
              </option>
            ))}
          </select>
          {errors.categoryId && (
            <p className="text-xs text-red-400 mt-1">{errors.categoryId.message}</p>
          )}
        </div>

        <Input
          label="Título da Discussão"
          placeholder="Ex: Como lidar com ausência de jogadores em campanhas longas?"
          error={errors.title?.message}
          {...register("title")}
        />

        <Textarea
          label="Mensagem / Conteúdo"
          placeholder="Descreva o contexto, sistema ou dúvidas detalhadamente..."
          rows={6}
          error={errors.content?.message}
          {...register("content")}
        />

        <div className="pt-3 flex items-center justify-end gap-3 border-t border-[#2D2D2D]">
          <Button type="button" variant="ghost" size="sm" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary" size="sm" isLoading={isSubmitting}>
            Publicar Discussão
          </Button>
        </div>
      </form>
    </Modal>
  );
}
