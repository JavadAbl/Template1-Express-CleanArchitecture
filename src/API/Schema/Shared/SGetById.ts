import z from "zod";

export const SGetById = z.object({
  id: z
    .string()
    .regex(/^\d+$/, { error: "Id must be a number" })
    .transform((s) => Number(s)),
});
