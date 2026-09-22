"use client";

import React, { useState } from "react";
import { initialTavernaCategories, initialTavernaTopics } from "@/data/taverna.mock";
import { ITavernaTopic } from "@/schemas/taverna.schema";
import { CategoryCard } from "@/components/taverna/category-card";
import { TopicRow } from "@/components/taverna/topic-row";
import { CreateTopicModal } from "@/components/taverna/create-topic-modal";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { ForgeDivider } from "@/components/ui/forge-divider";
import { PlusCircle, Search } from "lucide-react";
import { useAuth } from "@/context/auth-context";

export default function TavernaHubPage() {
  const [topics, setTopics] = useState<ITavernaTopic[]>(initialTavernaTopics);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { isAuthenticated, openAuthModal } = useAuth();

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
    <div className="mx-auto max-w-7xl space-y-14 px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      <SectionHeading
        level="h1"
        size="lg"
        kicker="Comunidade permanente"
        title="A Taverna da forja"
        description="O ponto de encontro para discutir sistemas, procurar mesas, tirar dúvidas de regras e compartilhar criações que permanecem úteis meses depois."
        action={
          <Button
            size="lg"
            variant="primary"
            onClick={() => {
              if (!isAuthenticated) {
                openAuthModal("login");
              } else {
                setIsModalOpen(true);
              }
            }}
          >
            <PlusCircle className="h-4 w-4" />
            <span>Criar nova discussão</span>
          </Button>
        }
      />

      <div className="space-y-6">
        <ForgeDivider label={`${initialTavernaCategories.length} categorias temáticas`} />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {initialTavernaCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <h2 className="font-display text-xl font-bold uppercase tracking-[0.04em] text-[#faf3e0]">
            Todas as discussões <span className="text-[#ff5a36]">({filteredTopics.length})</span>
          </h2>

          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#717171]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar discussões na Taverna..."
              className="w-full rounded-lg border border-[#2D2D2D] bg-[#1E1E1E] py-2 pl-9 pr-3.5 text-xs text-[#faf3e0] placeholder-[#717171] focus:border-[#ff2400] focus:outline-none"
            />
          </div>
        </div>

        {filteredTopics.length === 0 ? (
          <div className="space-y-2 chamfer-md bg-[#121214] py-16 text-center ring-1 ring-inset ring-[#2a2a30]">
            <p className="font-display text-base font-bold uppercase tracking-[0.04em] text-[#faf3e0]">Nenhuma discussão encontrada</p>
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
