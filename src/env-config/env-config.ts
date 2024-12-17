import { z } from "zod";

export const envSchema = z.object({
  PORT: z.coerce.number().default(5000),
  JWT_SECRET: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  RATE_LIMIT_TTL: z.coerce.number(),
  RATE_LIMIT: z.coerce.number(),
});

export type EnvironmentVariables = z.infer<typeof envSchema>;
