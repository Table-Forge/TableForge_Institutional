import { z } from "zod";

export const TavernaBadgeEnum = z.enum([
  "FerreiroFundador",
  "MestreDaForja",
  "ParceiroFundador",
  "CriadorDaForja",
  "Moderador",
]);

export const TavernaCategorySchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  icon: z.string(),
  topicsCount: z.number(),
  repliesCount: z.number(),
});

export const TavernaTopicSchema = z.object({
  id: z.number(),
  categoryId: z.number(),
  categoryName: z.string(),
  categorySlug: z.string(),
  title: z.string().min(5, "O título deve ter no mínimo 5 caracteres"),
  slug: z.string(),
  content: z.string().min(15, "O conteúdo deve ter no mínimo 15 caracteres"),
  author: z.object({
    userId: z.number(),
    username: z.string(),
    nickname: z.string(),
    avatarUrl: z.string(),
    badge: TavernaBadgeEnum.optional(),
  }),
  viewCount: z.number(),
  replyCount: z.number(),
  upvoteCount: z.number(),
  isPinned: z.boolean().default(false),
  isLocked: z.boolean().default(false),
  createdAtUtc: z.string(),
  lastActivityAtUtc: z.string(),
});

export const TavernaReplySchema = z.object({
  id: z.number(),
  topicId: z.number(),
  parentReplyId: z.number().nullable().optional(),
  author: z.object({
    userId: z.number(),
    username: z.string(),
    nickname: z.string(),
    avatarUrl: z.string(),
    badge: TavernaBadgeEnum.optional(),
  }),
  content: z.string().min(3, "A resposta não pode ser vazia"),
  upvoteCount: z.number().default(0),
  createdAtUtc: z.string(),
});

export const CreateTopicSchema = z.object({
  categoryId: z.number().min(1, "Selecione uma categoria"),
  title: z.string().min(5, "O título deve ter no mínimo 5 caracteres").max(200, "Título muito longo"),
  content: z.string().min(15, "O conteúdo deve ter no mínimo 15 caracteres"),
});

export const CreateReplySchema = z.object({
  content: z.string().min(3, "A resposta deve ter no mínimo 3 caracteres").max(3000, "Resposta muito longa"),
});

export type TTavernaBadge = z.infer<typeof TavernaBadgeEnum>;
export type ITavernaCategory = z.infer<typeof TavernaCategorySchema>;
export type ITavernaTopic = z.infer<typeof TavernaTopicSchema>;
export type ITavernaReply = z.infer<typeof TavernaReplySchema>;
export type ICreateTopicForm = z.infer<typeof CreateTopicSchema>;
export type ICreateReplyForm = z.infer<typeof CreateReplySchema>;
