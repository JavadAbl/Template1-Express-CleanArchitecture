import { IUserService } from "#Application/Interfaces/Services/IUserService.js";
import { IUserDto, toUserDto } from "#API/Interfaces/Dto/User/IUserDto.js";
import { DITypes } from "#Globals/DI/DITypes.js";
import { IUserRepository } from "#Infrastructure/Database/Interfaces/IUserRepository.js";
import { inject, injectable } from "inversify";
import { AppError } from "#Globals/Utils/AppError.js";
import { UserCache } from "#Infrastructure/Cache/UserCache.js";
import { buildFindManyArgs } from "#Globals/Utils/PrismaUtils.js";
import { IUserServiceCreate } from "#Application/Interfaces/ServiceCriteria/User/IUserServiceCreate.js";
import { IServiceFindOne } from "#Application/Interfaces/ServiceCriteria/Shared/IServiceFindOne.js";
import status from "http-status";
import { IServiceFindById } from "#Application/Interfaces/ServiceCriteria/Shared/IServiceFindById.js";
import { IUserServiceFindByUsername } from "#Application/Interfaces/ServiceCriteria/User/IUserServiceFindByUsername.js";
import { IServiceFindMany } from "#Application/Interfaces/ServiceCriteria/Shared/IServiceFindMany.js";

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(DITypes.UserRepository) private readonly rep: IUserRepository,
    @inject(DITypes.UserCache) private readonly userCache: UserCache,
  ) {}

  findById(criteria: IServiceFindById): Promise<IUserDto | null> {
    return this.rep.findUnique({ where: { id: criteria } });
  }

  findByUsername(criteria: IUserServiceFindByUsername): Promise<IUserDto | null> {
    return this.rep.findUnique({ where: { username: criteria } });
  }

  async findMany(criteria: IServiceFindMany): Promise<IUserDto[]> {
    const args = buildFindManyArgs<"User">(criteria, {
      searchableFields: ["username"],
    });

    return this.rep.findMany(args).then((users) => users.map(toUserDto));
  }

  async create(criteria: IUserServiceCreate): Promise<IUserDto> {
    const existingUser = await this.findOne({ value: criteria.username, field: "username" });

    if (existingUser) throw new AppError("This user is already exists", status.BAD_REQUEST);

    const user = await this.rep.create({ data: criteria });

    const userDto = toUserDto(user);
    await this.userCache.set(String(user.id), userDto, 3600);

    return userDto;
  }

  async findOne(criteria: IServiceFindOne): Promise<IUserDto | null> {
    const user = await this.rep.findOne({ where: { [criteria.field]: criteria.value } });
    return user ? toUserDto(user) : null;
  }
}
