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

export type TransfersFilter = {
  type: 'payer' | 'payee' | undefined,
  startDate: Date | undefined,
  endDate: Date | undefined,
}

export type FilterType = "all" | "period" | "participant";

export type FilterOption = {
  label: string;
  key: string;
  applyThisFilter: () => void;
};

export type FilterLabel = {
  label: string;
  type: FilterType;
  options?: FilterOption[];
  applyThisFilter?: () => void;
};

export const transferSchema = z.object({
  payeeDocumentOrEmail: z.string().min(1),
  value: z.string().transform((value, ctx) => {
    const formatedValue = parseFloat(value.replace(/\./g, '').replace(',', '.'));
    if (formatedValue <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "O valor deve ser maior que zero",
      })
    }
    return formatedValue;
  })
})

export type TransferSchema = z.infer<typeof transferSchema>