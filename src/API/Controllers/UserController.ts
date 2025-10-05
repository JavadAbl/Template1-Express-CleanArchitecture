import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { IUserService } from "#Application/Interfaces/Service/IUserService.js";
import { DITypes } from "#Globals/DI/DITypes.js";
import { zodValidation } from "#API/Decorators/ZodValidation.js";
import status from "http-status";
import { SGetById } from "#API/Schema/Shared/SGetById.js";
import { IGetByIdRequest } from "#Application/Interfaces/Request/Shared/IGetByIdRequest.js";
import { SUserCreate } from "#API/Schema/User/SUserCreate.js";
import { SFindManyQuery } from "#API/Schema/Shared/SFindManyQuery.js";
import { IFindManyQueryRequest } from "#Application/Interfaces/Request/Shared/IFindManyQueryRequest.js";
import { IUserDto } from "#Application/Interfaces/Dto/User/IUserDto.js";
import { IDeleteRequest } from "#Application/Interfaces/Request/Shared/IDeleteRequest.js";
import { SDelete } from "#API/Schema/Shared/SDelete.js";
import { IUserCreateRequest } from "#Application/Interfaces/Request/User/IUserCreateRequest.js";
import { JwtUtil } from "#Globals/Utils/Jwt.js";

@injectable()
export class UserController {
  constructor(@inject(DITypes.UserService) private readonly userService: IUserService) {}

  @zodValidation(SUserCreate, "body")
  public async post(req: Request<unknown, unknown, IUserCreateRequest, unknown>, res: Response) {
    const userDto = await this.userService.create(req.body);
    return res.status(status.CREATED).json(userDto);
  }

  @zodValidation(SFindManyQuery, "query")
  public async get(req: Request<unknown, unknown, unknown, IFindManyQueryRequest>, res: Response) {
    const users = await this.userService.findMany(req.query);
    return res.json(users);
  }

  @zodValidation(SGetById, "params")
  public async getById(req: Request<IGetByIdRequest, unknown, unknown, unknown>, res: Response) {
    const user = await this.userService.findById(req.params.id);
    return res.json(user);
  }

  public async put(req: Request<unknown, unknown, IUserDto, unknown>, res: Response) {
    await this.userService.update(req.body);
    return res.status(status.NO_CONTENT).send();
  }

  @zodValidation(SDelete, "params")
  public async delete(req: Request<IDeleteRequest, unknown, unknown, unknown>, res: Response) {
    await this.userService.delete(req.params);
    return res.status(status.NO_CONTENT).send();
  }
}
