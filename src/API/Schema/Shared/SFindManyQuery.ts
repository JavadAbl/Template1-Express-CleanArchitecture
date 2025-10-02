import { z } from "zod";

export const SFindManyQuery = z.object({
  page: z.number().min(0).optional(),
  limit: z.number().min(1).max(100).optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
  search: z.string().optional(),
});
