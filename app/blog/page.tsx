"use client";

import React, { useState, useMemo } from "react";
import { initialBlogPosts } from "@/data/blog.mock";
import { BlogCard } from "@/components/blog/blog-card";
import { TavernaBanner } from "@/components/blog/taverna-banner";
import { SectionHeading } from "@/components/ui/section-heading";
import { ForgeDivider } from "@/components/ui/forge-divider";
import { Search } from "lucide-react";

const categories = ["Todos", "Manifesto", "Dicas de Mestre", "Rotas da Forja"];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(() => {
    return initialBlogPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === "Todos" || post.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredPost = filteredPosts[0];
  const remainingPosts = filteredPosts.slice(1);

  return (
    <div className="mx-auto max-w-7xl space-y-12 px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      <SectionHeading
        level="h1"
        size="lg"
        align="center"
        kicker="Pergaminhos da forja"
        title="Blog e guias da forja"
        description="Artigos práticos, dicas de condução de aventuras, novidades do ecossistema e relatos da nossa comunidade."
      />

      <div className="flex flex-col items-center justify-between gap-4 border-b border-[#2D2D2D] sm:flex-row">
        <div className="flex w-full flex-wrap items-center gap-1 sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`-mb-px border-b-2 px-3.5 pb-3 pt-1 text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors ${
                selectedCategory === cat
                  ? "border-[#ff2400] text-[#faf3e0]"
                  : "border-transparent text-[#A1A1A1] hover:text-[#faf3e0]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full pb-3 sm:w-72">
          <Search className="absolute left-3 top-[calc(50%-6px)] h-4 w-4 -translate-y-1/2 text-[#717171]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar artigos por palavra-chave..."
            className="w-full rounded-lg border border-[#2D2D2D] bg-[#1E1E1E] py-2 pl-9 pr-3.5 text-xs text-[#faf3e0] placeholder-[#717171] focus:border-[#ff2400] focus:outline-none"
          />
        </div>
      </div>

      {filteredPosts.length === 0 ? (
        <div className="space-y-2 chamfer-md bg-[#121214] py-16 text-center ring-1 ring-inset ring-[#2a2a30]">
          <p className="font-display text-base font-bold uppercase tracking-[0.04em] text-[#faf3e0]">Nenhum artigo encontrado</p>
          <p className="text-xs text-[#A1A1A1]">Tente buscar por outros termos ou selecionar outra categoria.</p>
        </div>
      ) : (
        <div className="space-y-10">
          {featuredPost && <BlogCard post={featuredPost} featured />}

          {remainingPosts.length > 0 && (
            <>
              <ForgeDivider label="Mais artigos" />
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {remainingPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      <TavernaBanner
        categorySlug="mestres-narradores"
        categoryName="Mestres & Narradores"
      />
    </div>
  );
}
