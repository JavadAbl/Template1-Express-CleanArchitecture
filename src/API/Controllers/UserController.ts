import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { IUserService } from "#Application/Interfaces/Services/IUserService.js";
import { DITypes } from "#Globals/DI/DITypes.js";
import { zodValidation } from "#API/Decorators/ZodValidation.js";
import status from "http-status";
import { SGetById } from "#API/Schema/Shared/SGetById.js";
import { IGetByIdDto } from "#Application/Interfaces/Request/Shared/IGetByIdRequest.js";
import { IUserCreateDto } from "#Application/Interfaces/Dto/User/IUserCreateRequest.js";
import { SUserCreate } from "#API/Schema/User/SUserCreate.js";
import { SFindManyQuery } from "#API/Schema/Shared/SFindManyQuery.js";
import { IFindManyQueryDto } from "#Application/Interfaces/Request/Shared/IFindManyQueryRequest.js";
import { IUserDto } from "#Application/Interfaces/Dto/User/IUserDto.js";
import { IDeleteDto } from "#Application/Interfaces/Request/Shared/IDeleteRequest.js";
import { SDelete } from "#API/Schema/Shared/SDelete.js";

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
    return res.json(user);
  }

  public async put(req: Request<unknown, unknown, IUserDto, unknown>, res: Response) {
    await this.userService.update(req.body);
    return res.status(status.NO_CONTENT).send();
  }

  @zodValidation(SDelete, "params")
  public async delete(req: Request<IDeleteDto, unknown, unknown, unknown>, res: Response) {
    await this.userService.delete(req.params);
    return res.status(status.NO_CONTENT).send();
  }
}
