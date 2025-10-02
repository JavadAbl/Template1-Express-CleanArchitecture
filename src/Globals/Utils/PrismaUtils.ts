import { IQueryDto } from "#API/Interfaces/Dto/IQueryDto.js";
import { Prisma } from "#Infrastructure/Database/Prisma/index.js";

export function buildFindManyArgs<T extends keyof Prisma.TypeMap["model"]>(
  criteria: IQueryDto,
  options?: {
    searchableFields?: string[]; // ✅ simpler and flexible
  },
): Prisma.TypeMap["model"][T]["operations"]["findMany"]["args"] {
  const { page = 0, limit = 10, sortBy, sortOrder = "asc", search } = criteria;

  const args: any = {
    skip: page * limit,
    take: Math.min(limit, 100),
  };

  if (sortBy) {
    args.orderBy = { [sortBy]: sortOrder };
  }

  if (search && options?.searchableFields?.length) {
    args.where = {
      OR: options.searchableFields.map((field) => ({
        [field]: { contains: search },
      })),
    };
  }

  return args;
}
