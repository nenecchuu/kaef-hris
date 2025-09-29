import { z } from "zod";

export const PasswordComplexitySchema = z.object({
  id: z.number(),
  minimum_limit_character: z.number(),
  password_reuse_limit: z.number(),
  password_expired_period: z.number(),
  is_minimum_limit_character: z.boolean(),
  is_password_reuse_limit: z.boolean(),
  use_capital_letter: z.boolean(),
  use_small_letter: z.boolean(),
  use_number: z.boolean(),
  use_symbol: z.boolean(),
});

export type PasswordComplexity = z.infer<typeof PasswordComplexitySchema>;
