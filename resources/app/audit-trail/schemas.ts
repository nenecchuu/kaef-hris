import { z } from "zod";

export const AuditTrailSchema = z.object({
  id: z.number(),
  created_at: z.string().nullable(),
  formatted_created_at: z.string().nullable(),
  performed_by_name: z.string().nullable(),
  action: z.string().nullable(),
  formatted_description: z.string().nullable(),
});

export type AuditTrail = z.infer<typeof AuditTrailSchema>;
