import { z } from 'zod';

export const userRegSchema = z.object({
  name: z.string().min(1, 'Enter name'),
  email: z.string().min(1, 'Enter email'),
  password: z.string().min(1, 'Enter password'),
});

export const userLogSchema = z.object({
  email: z.string().min(1, 'Enter email'),
  password: z.string().min(1, 'Enter password'),
});

export type UserRegType = z.infer<typeof userRegSchema>;
export type UserLogType = z.infer<typeof userLogSchema>;
