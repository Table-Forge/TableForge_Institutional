import React from "react";
import Link from "next/link";
import Image from "next/image";
import { IBlogPost } from "@/schemas/blog.schema";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar } from "lucide-react";

export interface IBlogCard {
  post: IBlogPost;
  featured?: boolean;
}

export function BlogCard({ post, featured = false }: IBlogCard) {
  const formattedDate = new Date(post.publishedAtUtc).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  if (featured) {
    return (
      <Link
        href={`/blog/${post.slug}`}
        className="group grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#1E1E1E] border border-[#2D2D2D] hover:border-[#ff2400]/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[#ff2400]/5"
      >
        <div className="lg:col-span-7 relative h-64 lg:h-full min-h-[280px] w-full bg-[#2D2D2D]">
          <Image
            src={post.coverImageUrl}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="lg:col-span-5 p-6 lg:p-8 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="primary">{post.category}</Badge>
              <span className="text-xs text-[#A1A1A1] flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {post.estimatedReadingTimeMinutes} min de leitura
              </span>
            </div>
            <h3 className="text-xl lg:text-2xl font-bold text-[#faf3e0] group-hover:text-[#ff2400] transition-colors line-clamp-2">
              {post.title}
            </h3>
            <p className="text-sm text-[#A1A1A1] line-clamp-3 leading-relaxed">
              {post.summary}
            </p>
          </div>

          <div className="pt-6 border-t border-[#2D2D2D] flex items-center justify-between text-xs text-[#A1A1A1] mt-4">
            <div className="flex items-center gap-2">
              <div className="relative w-6 h-6 rounded-full overflow-hidden bg-[#3a3a3a]">
                <Image
                  src={post.authorAvatarUrl}
                  alt={post.authorName}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="font-medium text-[#D1D1D1]">{post.authorName}</span>
            </div>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formattedDate}
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col bg-[#1E1E1E] border border-[#2D2D2D] hover:border-[#ff2400]/40 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-[#ff2400]/5"
    >
      <div className="relative h-48 w-full bg-[#2D2D2D] overflow-hidden">
        <Image
          src={post.coverImageUrl}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <Badge variant="primary">{post.category}</Badge>
        </div>
      </div>
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-[#A1A1A1]">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {post.estimatedReadingTimeMinutes} min
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formattedDate}
            </span>
          </div>
          <h4 className="text-base font-semibold text-[#faf3e0] group-hover:text-[#ff2400] transition-colors line-clamp-2">
            {post.title}
          </h4>
          <p className="text-xs text-[#A1A1A1] line-clamp-2 leading-relaxed">
            {post.summary}
          </p>
        </div>

        <div className="pt-3 border-t border-[#2D2D2D] flex items-center gap-2 text-xs text-[#A1A1A1]">
          <div className="relative w-5 h-5 rounded-full overflow-hidden bg-[#3a3a3a]">
            <Image
              src={post.authorAvatarUrl}
              alt={post.authorName}
              fill
              className="object-cover"
            />
          </div>
          <span className="font-medium text-[#D1D1D1]">{post.authorName}</span>
        </div>
      </div>
    </Link>
  );
}
