"use client";

import React, { useState, useMemo } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { initialTavernaCategories, initialTavernaTopics } from "@/data/taverna.mock";
import { ITavernaTopic } from "@/schemas/taverna.schema";
import { TopicRow } from "@/components/taverna/topic-row";
import { CreateTopicModal } from "@/components/taverna/create-topic-modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, PlusCircle, Sparkles } from "lucide-react";

export default function TavernaCategoryPage() {
  const params = useParams();
  const categorySlug = params.category as string;

  const category = initialTavernaCategories.find((c) => c.slug === categorySlug);

  const [topics, setTopics] = useState<ITavernaTopic[]>(initialTavernaTopics);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState<"recent" | "replies" | "upvotes">("recent");

  const categoryTopics = useMemo(() => {
    const list = topics.filter((t) => t.categorySlug === categorySlug);
    return list.sort((a, b) => {
      if (b.isPinned !== a.isPinned) {
        return b.isPinned ? 1 : -1;
      }
      if (sortBy === "replies") return b.replyCount - a.replyCount;
      if (sortBy === "upvotes") return b.upvoteCount - a.upvoteCount;
      return new Date(b.createdAtUtc).getTime() - new Date(a.createdAtUtc).getTime();
    });
  }, [topics, categorySlug, sortBy]);

  if (!category) {
    return notFound();
  }

  const handleTopicCreated = (newTopic: ITavernaTopic) => {
    setTopics((prev) => [newTopic, ...prev]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-10">
      <div className="space-y-4">
        <Link
          href="/taverna"
          className="inline-flex items-center gap-1.5 text-xs text-[#A1A1A1] hover:text-[#ff2400] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Voltar para todas as categorias d&apos;A Taverna</span>
        </Link>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-2">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <Badge variant="primary">{category.name}</Badge>
              <span className="text-xs text-[#717171]">{categoryTopics.length} discussões</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-[#faf3e0] tracking-tight">
              {category.name}
            </h1>
            <p className="text-sm text-[#A1A1A1] leading-relaxed">
              {category.description}
            </p>
          </div>

          <Button
            size="md"
            variant="primary"
            onClick={() => setIsModalOpen(true)}
            className="shrink-0 shadow-lg shadow-[#ff2400]/20"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Nova Discussão</span>
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#2D2D2D]">
        <div className="flex items-center gap-2 text-xs">
          <span className="text-[#717171] font-medium mr-1">Ordenar por:</span>
          <button
            onClick={() => setSortBy("recent")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              sortBy === "recent"
                ? "bg-[#ff2400] text-[#faf3e0]"
                : "bg-[#1E1E1E] text-[#A1A1A1] hover:text-[#faf3e0]"
            }`}
          >
            Mais Recentes
          </button>
          <button
            onClick={() => setSortBy("replies")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              sortBy === "replies"
                ? "bg-[#ff2400] text-[#faf3e0]"
                : "bg-[#1E1E1E] text-[#A1A1A1] hover:text-[#faf3e0]"
            }`}
          >
            Mais Respondidos
          </button>
          <button
            onClick={() => setSortBy("upvotes")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              sortBy === "upvotes"
                ? "bg-[#ff2400] text-[#faf3e0]"
                : "bg-[#1E1E1E] text-[#A1A1A1] hover:text-[#faf3e0]"
            }`}
          >
            Mais Votados
          </button>
        </div>
      </div>

      {categoryTopics.length === 0 ? (
        <div className="text-center py-16 bg-[#1E1E1E] border border-[#2D2D2D] rounded-2xl space-y-3">
          <Sparkles className="w-8 h-8 text-[#A1A1A1] mx-auto" />
          <p className="text-base font-semibold text-[#faf3e0]">Nenhuma discussão nesta categoria ainda</p>
          <p className="text-xs text-[#A1A1A1] max-w-sm mx-auto">
            A taverna está vazia neste canto. Seja o primeiro aventureiro a abrir uma conversa!
          </p>
          <Button size="sm" variant="primary" onClick={() => setIsModalOpen(true)}>
            Criar Primeiro Tópico
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {categoryTopics.map((topic) => (
            <TopicRow key={topic.id} topic={topic} showCategory={false} />
          ))}
        </div>
      )}

      <CreateTopicModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        categories={[category]}
        onTopicCreated={handleTopicCreated}
      />
    </div>
  );
}
