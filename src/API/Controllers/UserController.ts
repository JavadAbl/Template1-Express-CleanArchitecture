import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { IUserService } from "#Application/Interfaces/Services/IUserService.js";
import { DITypes } from "#Globals/DI/DITypes.js";
import { zodValidation } from "#API/Decorators/ZodValidation.js";
import status from "http-status";
import { SGetById } from "#API/Schema/Shared/SGetById.js";
import { IGetByIdDto } from "#API/Interfaces/Dto/Shared/IGetByIdDto.js";
import { IUserCreateDto } from "#API/Interfaces/Dto/User/IUserCreateDto.js";
import { SUserCreate } from "#API/Schema/User/SUserCreate.js";
import { SFindManyQuery } from "#API/Schema/Shared/SFindManyQuery.js";
import { IFindManyQueryDto } from "#API/Interfaces/Dto/Shared/IFindManyQueryDto.js";

@injectable()
export class UserController {
  constructor(@inject(DITypes.UserService) private readonly userService: IUserService) {}

  @zodValidation(SUserCreate, "body")
  public async post(req: Request<unknown, unknown, IUserCreateDto, unknown>, res: Response) {
    const userDto = await this.userService.create(req.body);
    return res.status(status.CREATED).json(userDto);
  }

  @zodValidation(SFindManyQuery, "query")
  public async get(req: Request<unknown, unknown, unknown, IFindManyQueryDto>, res: Response) {
    const users = await this.userService.findMany(req.query);
    return res.json(users);
  }

  @zodValidation(SGetById, "params")
  public async getById(req: Request<IGetByIdDto, unknown, unknown, unknown>, res: Response) {
    const user = await this.userService.findById(req.params.id);

    if (!user) return res.status(status.NOT_FOUND).send("User not found");
    return res.json(user);
  }
}
