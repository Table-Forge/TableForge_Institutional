import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { initialBlogPosts, initialBlogComments } from "@/data/blog.mock";
import { Badge } from "@/components/ui/badge";
import { TavernaBanner } from "@/components/blog/taverna-banner";
import { CommentSection } from "@/components/blog/comment-section";
import { Clock, Calendar, ArrowLeft } from "lucide-react";

interface IBlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: IBlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = initialBlogPosts.find((p) => p.slug === slug);
  if (!post) {
    return { title: "Artigo Não Encontrado | TableForge" };
  }

  return {
    title: `${post.title} | Blog TableForge`,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      publishedTime: post.publishedAtUtc,
      images: [{ url: post.coverImageUrl }],
    },
  };
}

export default async function BlogPostPage({ params }: IBlogPostPageProps) {
  const { slug } = await params;
  const post = initialBlogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const comments = initialBlogComments[post.id] || [];

  const formattedDate = new Date(post.publishedAtUtc).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary,
    image: post.coverImageUrl,
    datePublished: post.publishedAtUtc,
    author: {
      "@type": "Person",
      name: post.authorName,
    },
    publisher: {
      "@type": "Organization",
      name: "TableForge",
      url: "https://tableforge.com.br",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-10">
        <div className="space-y-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs text-[#A1A1A1] hover:text-[#ff2400] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar para todos os artigos</span>
          </Link>

          <div className="flex flex-wrap items-center gap-2 pt-2">
            <Badge variant="primary">{post.category}</Badge>
            <span className="text-xs text-[#A1A1A1] flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.estimatedReadingTimeMinutes} min de leitura
            </span>
          </div>

          <h1 className="font-display text-2xl font-bold uppercase leading-[1.15] tracking-[0.02em] text-[#faf3e0] sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-[#2D2D2D] text-xs text-[#A1A1A1]">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full overflow-hidden bg-[#3a3a3a]">
                <Image
                  src={post.authorAvatarUrl}
                  alt={post.authorName}
                  fill
                  sizes="36px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-bold text-[#faf3e0]">{post.authorName}</p>
                <p className="text-[11px] text-[#717171]">Publicado em {formattedDate}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {formattedDate}
              </span>
            </div>
          </div>
        </div>

        <div className="relative h-72 w-full chamfer-lg overflow-hidden bg-[#2D2D2D] sm:h-96 lg:h-[450px]">
          <Image
            src={post.coverImageUrl}
            alt={post.title}
            fill
            sizes="(max-width: 896px) 100vw, 896px"
            priority
            className="object-cover"
          />
        </div>

        <div className="prose prose-invert max-w-none space-y-6 whitespace-pre-line text-sm leading-relaxed text-[#D1D1D1] first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-display first-letter:text-5xl first-letter:font-bold first-letter:leading-[0.8] first-letter:text-[#ff5a36] sm:text-base">
          {post.content}
        </div>

        <div className="pt-6 flex flex-wrap items-center gap-2 border-t border-[#2D2D2D]">
          <span className="text-xs text-[#717171] font-medium mr-2">Tags:</span>
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              #{tag}
            </Badge>
          ))}
        </div>

        <TavernaBanner
          categorySlug="mestres-narradores"
          categoryName="Mestres & Narradores"
        />

        <CommentSection postId={post.id} initialComments={comments} />
      </article>
    </>
  );
}
