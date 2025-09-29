import type { PasswordComplexity } from "@src/app/password-complexity/schemas";

export const validatePassword = (
  passwordComplexitySchema: PasswordComplexity,
  password: string,
  errorMap: Map<string, string>,
) => {
  if (
    passwordComplexitySchema.is_minimum_limit_character &&
    password.length < passwordComplexitySchema.minimum_limit_character
  ) {
    errorMap.set(
      "password",
      `Password must be at least ${passwordComplexitySchema.minimum_limit_character} characters.`,
    );
  } else if (
    passwordComplexitySchema.use_capital_letter &&
    !/[A-Z]/.test(password)
  ) {
    errorMap.set(
      "password",
      "Password must include at least one capital letter.",
    );
  } else if (
    passwordComplexitySchema.use_small_letter &&
    !/[a-z]/.test(password)
  ) {
    errorMap.set(
      "password",
      "Password must include at least one small letter.",
    );
  } else if (passwordComplexitySchema.use_number && !/[0-9]/.test(password)) {
    errorMap.set("password", "Password must include at least one number.");
  } else if (
    passwordComplexitySchema.use_symbol &&
    !/[!@#$%^&*(),.?":{}|<>]/.test(password)
  ) {
    errorMap.set("password", "Password must include at least one symbol.");
  } else {
    errorMap.delete("password");
  }

  return errorMap;
};
