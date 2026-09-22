import React from "react";
import Link from "next/link";
import Image from "next/image";
import { IBlogPost } from "@/schemas/blog.schema";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

export interface IBlogCard {
  post: IBlogPost;
  featured?: boolean;
}

interface IAuthorLine {
  post: IBlogPost;
  size: "sm" | "md";
}

function AuthorLine({ post, size }: IAuthorLine) {
  const avatarSize = size === "md" ? "h-6 w-6" : "h-5 w-5";
  return (
    <div className="flex items-center gap-2 text-xs text-[#A1A1A1]">
      <div
        className={`relative ${avatarSize} overflow-hidden rounded-full bg-[#3a3a3a]`}
      >
        <Image
          src={post.authorAvatarUrl}
          alt={post.authorName}
          fill
          sizes="24px"
          className="object-cover"
        />
      </div>
      <span className="font-medium text-[#D1D1D1]">{post.authorName}</span>
    </div>
  );
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function BlogCard({ post, featured = false }: IBlogCard) {
  const formattedDate = formatDate(post.publishedAtUtc);
  const dateline = `${formattedDate} · ${post.estimatedReadingTimeMinutes} min de leitura`;

  if (featured) {
    return (
      <Link
        href={`/blog/${post.slug}`}
        className="group block chamfer-lg bg-[#2a2a30] p-px"
      >
        <div className="chamfer-lg grid grid-cols-1 gap-0 bg-[#121214] lg:grid-cols-12">
          <div className="relative h-64 w-full bg-[#2D2D2D] lg:col-span-7 lg:h-full lg:min-h-[320px]">
            <Image
              src={post.coverImageUrl}
              alt={post.title}
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col justify-between p-6 lg:col-span-5 lg:p-8">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="primary">{post.category}</Badge>
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#717171]">
                  {dateline}
                </span>
              </div>
              <h3 className="font-display text-xl font-bold uppercase leading-[1.15] tracking-[0.02em] text-[#faf3e0] transition-colors group-hover:text-[#ff5a36] lg:text-2xl">
                {post.title}
              </h3>
              <p className="text-sm leading-relaxed text-[#A1A1A1] line-clamp-3">
                {post.summary}
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-[#2a2a30] pt-5">
              <AuthorLine post={post} size="md" />
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#ff5a36]">
                Ler artigo
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block h-full chamfer-md bg-[#2a2a30] p-px"
    >
      <div className="chamfer-md flex h-full flex-col bg-[#121214]">
        <div className="relative h-48 w-full overflow-hidden bg-[#2D2D2D]">
          <Image
            src={post.coverImageUrl}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 384px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute left-3 top-3">
            <Badge variant="primary">{post.category}</Badge>
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-between gap-4 p-5">
          <div className="space-y-2">
            <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#717171]">
              <Clock className="h-3 w-3" />
              {dateline}
            </span>
            <h4 className="font-display text-base font-bold uppercase leading-[1.2] tracking-[0.02em] text-[#faf3e0] transition-colors group-hover:text-[#ff5a36] line-clamp-2">
              {post.title}
            </h4>
            <p className="text-xs leading-relaxed text-[#A1A1A1] line-clamp-2">
              {post.summary}
            </p>
          </div>

          <div className="border-t border-[#2a2a30] pt-3">
            <AuthorLine post={post} size="sm" />
          </div>
        </div>
      </div>
    </Link>
  );
}
