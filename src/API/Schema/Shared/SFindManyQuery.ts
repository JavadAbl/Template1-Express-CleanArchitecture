import { transformToNumber } from "#Globals/Utils/ValidationUtils.js";
import { z } from "zod";

export const SFindManyQuery = z.object({
  page: z
    .number()
    .min(0)
    .optional()
    .transform((value) => transformToNumber(value, 2)),
  limit: z
    .string()
    .min(1)
    .max(100)
    .transform((val) => Number(val))
    .optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
  search: z.string().optional(),
});
