import { z } from "zod";

export const TeamMemberSchema = z.object({
  id: z.number(),
  name: z.string(),
  role: z.string(),
  bio: z.string(),
  avatarUrl: z.string(),
  favoriteSystemOrGame: z.string(),
  githubUrl: z.string().optional(),
  linkedinUrl: z.string().optional(),
  twitterUrl: z.string().optional(),
});

export type ITeamMember = z.infer<typeof TeamMemberSchema>;
