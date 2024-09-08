import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(1)
})
export type LoginSchema = z.infer<typeof loginSchema>

export const registerSchema = z.object({
  fullName: z.string().min(1),
  document: z.string().min(11),
  email: z.string().email().min(1),
  password: z.string().min(1),
  userType: z.enum(["COMMON", "MERCHANT"])
})

export type RegisterSchema = z.infer<typeof registerSchema>


export type FilterType = "all" | "period" | "type";

export type FilterLabel = {
  label: string;
  value: FilterType;
  options?: { value: string, label: string }[];
}