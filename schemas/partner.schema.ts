import { z } from "zod";

export const PartnerLeadSchema = z.object({
  spaceOrEventName: z.string().min(3, "Nome do espaço ou evento é obrigatório"),
  responsibleName: z.string().min(3, "Nome do responsável é obrigatório"),
  email: z.string().email("Informe um e-mail válido"),
  phone: z.string().min(10, "Telefone com DDD é obrigatório"),
  city: z.string().min(2, "Cidade é obrigatória"),
  state: z.string().min(2, "Estado é obrigatório"),
  type: z.number().min(1, "Selecione o tipo de parceria"),
  estimatedTablesOrCapacity: z.number().optional(),
  notes: z.string().optional(),
});

export type IPartnerLeadForm = z.infer<typeof PartnerLeadSchema>;
