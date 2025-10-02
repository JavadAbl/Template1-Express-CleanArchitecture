import { Prisma } from "#Infrastructure/Database/Prisma/index.js";
import { IFindManyQueryDto } from "./IFindManyQueryDto.js";

export interface IUserListQueryDto extends IFindManyQueryDto {
  /** Restrict sortBy to fields that actually exist on the User model */
  sortBy?: keyof Prisma.UserOrderByWithRelationInput;
}
