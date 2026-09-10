"use client";

import React, { useState, useMemo } from "react";
import { initialBlogPosts } from "@/data/blog.mock";
import { BlogCard } from "@/components/blog/blog-card";
import { Badge } from "@/components/ui/badge";
import { TavernaBanner } from "@/components/blog/taverna-banner";
import { Search, Sparkles } from "lucide-react";

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 space-y-12">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <Badge variant="primary" className="mx-auto">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Máquina de Conteúdo</span>
        </Badge>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#faf3e0] tracking-tight">
          Blog & Guias da Forja
        </h1>
        <p className="text-sm sm:text-base text-[#A1A1A1] leading-relaxed">
          Artigos práticos, dicas de condução de aventuras, novidades do ecossistema e relatos da nossa comunidade.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-[#2D2D2D]">
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs px-3.5 py-1.5 rounded-full font-medium transition-colors ${
                selectedCategory === cat
                  ? "bg-[#ff2400] text-[#faf3e0]"
                  : "bg-[#1E1E1E] text-[#A1A1A1] hover:text-[#faf3e0] border border-[#2D2D2D]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#717171]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar artigos por palavra-chave..."
            className="w-full bg-[#1E1E1E] text-[#faf3e0] placeholder-[#717171] border border-[#2D2D2D] rounded-lg pl-9 pr-3.5 py-2 text-xs focus:outline-none focus:border-[#ff2400]"
          />
        </div>
      </div>

      {filteredPosts.length === 0 ? (
        <div className="text-center py-16 bg-[#1E1E1E] border border-[#2D2D2D] rounded-xl space-y-2">
          <p className="text-base font-semibold text-[#faf3e0]">Nenhum artigo encontrado</p>
          <p className="text-xs text-[#A1A1A1]">Tente buscar por outros termos ou selecionar outra categoria.</p>
        </div>
      ) : (
        <div className="space-y-10">
          {featuredPost && <BlogCard post={featuredPost} featured />}

          {remainingPosts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {remainingPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
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
