import { z } from "zod";

export const envSchema = z.object({
  PORT: z.coerce.number().default(5000),
});

export type EnvironmentVariables = z.infer<typeof envSchema>;
