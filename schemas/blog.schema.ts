import { z } from "zod";

export const BlogPostSchema = z.object({
  id: z.number(),
  title: z.string(),
  slug: z.string(),
  summary: z.string(),
  content: z.string(),
  coverImageUrl: z.string(),
  authorName: z.string(),
  authorAvatarUrl: z.string(),
  category: z.string(),
  tags: z.array(z.string()),
  estimatedReadingTimeMinutes: z.number(),
  publishedAtUtc: z.string(),
});

export const BlogCommentSchema = z.object({
  id: z.number(),
  postId: z.number(),
  authorName: z.string(),
  authorAvatarUrl: z.string(),
  content: z.string().min(3, "O comentário deve ter no mínimo 3 caracteres"),
  createdAtUtc: z.string(),
});

export const CreateCommentSchema = z.object({
  authorName: z.string().min(2, "Informe seu nome ou apelido"),
  content: z.string().min(3, "O comentário deve ter no mínimo 3 caracteres").max(1000, "Comentário muito longo"),
});

export type IBlogPost = z.infer<typeof BlogPostSchema>;
export type IBlogComment = z.infer<typeof BlogCommentSchema>;
export type ICreateCommentForm = z.infer<typeof CreateCommentSchema>;
