import { z } from "zod";

export const GenerateMfaSchema = z.object({
  url: z.string(),
});

export const UserOptionSchema = z.object({
  id: z.number(),
  name: z.string(),
  division_id: z.string(),
});

export const SelectOptionSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const JobPositionSchema = z.object({
  id: z.number(),
  name: z.string(),
  is_team_lead: z.boolean().nullable(),
  is_head_division: z.boolean().nullable(),
});

export const SelectOptionListSchema = z.array(SelectOptionSchema);
export const SelectJobPositionSchema = z.array(JobPositionSchema);
export const SelectUserSchema = z.array(UserOptionSchema);

export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  avatar_path: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  birthdate: z.string().nullable().optional(),
  formatted_birthdate: z.string().nullable().optional(),
  job_position_name: z.string().nullable().optional(),
  division_name: z.string().nullable().optional(),
  job_position: SelectOptionSchema.nullable().optional(),
  division: SelectOptionSchema.nullable().optional(),
  team_lead: SelectOptionSchema.nullable().optional(),
  head_division: SelectOptionSchema.nullable().optional(),
  ldap_username: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  division_id: z.number().optional(),
  job_position_id: z.number().nullable().optional(),
  team_lead_id: z.number().nullable().optional(),
  head_division_id: z.number().nullable().optional(),
  is_active: z.boolean(),
  is_administrator: z.boolean().nullable().optional(),
  is_team_lead: z.boolean().nullable().optional(),
  is_head_division: z.boolean().nullable().optional(),
  is_email_blacklisted: z.boolean().nullable().optional(),
  is_use_mfa: z.boolean().nullable().optional(),
  is_mfa_enabled: z.boolean().nullable().optional(),
  master_application_ids: z.array(z.number()).nullable().optional(),
});

export const UserEntryRelatedDataSchema = z.object({
  divisions: SelectOptionListSchema,
  job_positions: SelectJobPositionSchema,
  team_leads: SelectUserSchema,
  head_divisions: SelectUserSchema,
  master_applications: SelectOptionListSchema,
});

export type User = z.infer<typeof UserSchema>;
export type UserEntryRelatedData = z.infer<typeof UserEntryRelatedDataSchema>;
