import { z } from "zod";

export const AuthenticatedUserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  division_id: z.number(),
  head_division_id: z.number(),
  job_position_id: z.number(),
  team_lead_id: z.number(),
  is_active: z.boolean(),
  is_administrator: z.boolean(),
  is_superadmin: z.boolean(),
  is_mfa_enabled: z.boolean(),
  is_email_blacklisted: z.boolean(),
  is_team_lead: z.boolean(),
  is_use_mfa: z.boolean(),
  permissions: z.array(z.string()),
  avatar_path: z.string(),
});

export type AuthenticatedUser = z.infer<typeof AuthenticatedUserSchema>;
