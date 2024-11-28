import { z } from "zod";

export const envSchema = z.object({
  PORT: z.coerce.number().default(5000),
  JWT_SECRET: z.string(),
});

export type EnvironmentVariables = z.infer<typeof envSchema>;
