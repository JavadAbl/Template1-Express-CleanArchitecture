import { UserController } from "#API/Controllers/UserController.js";
import { DITypes } from "#Globals/DI/DITypes.js";
import { Router } from "express";
import { inject, injectable } from "inversify";

@injectable()
export class UserRoutes {
  private readonly path = "/User";
  private router: Router;

  constructor(@inject(DITypes.UserController) private readonly userController: UserController) {
    this.router = Router();
    this.router.use(this.path, this.router);
    this.initializeRoutes();
  }
  public routes(): Router {
    return this.router;
  }

  private initializeRoutes(): void {
    this.router.get("/", (req, res) => this.userController.get(req, res));
    this.router.get("/:id", (req, res) => this.userController.getById(req, res));
    this.router.post("/", (req, res) => this.userController.post(req, res));
  }
}
