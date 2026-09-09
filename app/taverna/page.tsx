"use client";

import React, { useState } from "react";
import { initialTavernaCategories, initialTavernaTopics } from "@/data/taverna.mock";
import { ITavernaTopic } from "@/schemas/taverna.schema";
import { CategoryCard } from "@/components/taverna/category-card";
import { TopicRow } from "@/components/taverna/topic-row";
import { CreateTopicModal } from "@/components/taverna/create-topic-modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlusCircle, Search, MessageSquare, Sparkles } from "lucide-react";

export default function TavernaHubPage() {
  const [topics, setTopics] = useState<ITavernaTopic[]>(initialTavernaTopics);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleTopicCreated = (newTopic: ITavernaTopic) => {
    setTopics((prev) => [newTopic, ...prev]);
  };

  const filteredTopics = topics.filter((t) => {
    if (!searchQuery.trim()) return true;
    return (
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 space-y-14">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-[#2D2D2D]">
        <div className="space-y-3 max-w-2xl">
          <Badge variant="primary">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Comunidade Permanente</span>
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#faf3e0] tracking-tight">
            A Taverna da Forja
          </h1>
          <p className="text-sm sm:text-base text-[#A1A1A1] leading-relaxed">
            O ponto de encontro para discutir sistemas, procurar mesas, tirar dúvidas de regras e compartilhar criações que permanecem úteis meses depois.
          </p>
        </div>

        <Button
          size="lg"
          variant="primary"
          onClick={() => setIsModalOpen(true)}
          className="shrink-0 shadow-lg shadow-[#ff2400]/20"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Criar Nova Discussão</span>
        </Button>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#faf3e0]">
            Categorias Temáticas
          </h2>
          <span className="text-xs text-[#717171]">
            {initialTavernaCategories.length} categorias ativas
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {initialTavernaCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>

      <div className="space-y-6 pt-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#ff2400]" />
            <h2 className="text-xl font-bold text-[#faf3e0]">
              Todas as Discussões ({filteredTopics.length})
            </h2>
          </div>

          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#717171]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar discussões na Taverna..."
              className="w-full bg-[#1E1E1E] text-[#faf3e0] placeholder-[#717171] border border-[#2D2D2D] rounded-lg pl-9 pr-3.5 py-2 text-xs focus:outline-none focus:border-[#ff2400]"
            />
          </div>
        </div>

        {filteredTopics.length === 0 ? (
          <div className="text-center py-16 bg-[#1E1E1E] border border-[#2D2D2D] rounded-2xl space-y-2">
            <p className="text-base font-semibold text-[#faf3e0]">Nenhuma discussão encontrada</p>
            <p className="text-xs text-[#A1A1A1]">Seja o primeiro a iniciar uma conversa sobre este assunto!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTopics.map((topic) => (
              <TopicRow key={topic.id} topic={topic} />
            ))}
          </div>
        )}
      </div>

      <CreateTopicModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        categories={initialTavernaCategories}
        onTopicCreated={handleTopicCreated}
      />
    </div>
  );
}
