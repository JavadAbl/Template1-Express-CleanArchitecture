import { IUserDto } from "#API/Interfaces/Dto/User/IUserDto.js";
import { IServiceFindMany } from "../ServiceCriteria/Shared/IServiceFindMany.js";
import { IUserServiceCreate } from "../ServiceCriteria/User/IUserServiceCreate.js";
import { IServiceFindOne } from "../ServiceCriteria/Shared/IServiceFindOne.js";
import { IServiceFindById } from "../ServiceCriteria/Shared/IServiceFindById.js";
import { IUserServiceFindByUsername } from "../ServiceCriteria/User/IUserServiceFindByUsername.js";

export interface IUserService {
  create(criteria: IUserServiceCreate): Promise<IUserDto>;

  findOne(criteria: IServiceFindOne): Promise<IUserDto | null>;

  findById(criteria: IServiceFindById): Promise<IUserDto | null>;

  findByUsername(criteria: IUserServiceFindByUsername): Promise<IUserDto | null>;

  findMany(criteria: IServiceFindMany): Promise<IUserDto[]>;
}
