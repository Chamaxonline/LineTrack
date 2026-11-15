import { z } from "zod";

export const tenantSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type TenantSchema = z.infer<typeof tenantSchema>;
