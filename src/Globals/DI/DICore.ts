import { Container } from "inversify";
import { DITypes } from "./DITypes.js";
import { AppRoutes } from "#API/Routes/AppRoutes.js";
import { IUserService } from "#Application/Interfaces/Service/IUserService.js";
import { UserService } from "#Application/Services/UserService.js";
import { UserRepository } from "#Infrastructure/Database/Repository/UserRepository.js";
import { UserController } from "#API/Controllers/UserController.js";
import { UserRoutes } from "#API/Routes/UserRoutes.js";
import { PrismaClient } from "#Infrastructure/Database/Prisma/index.js";
import { UserCache } from "#Infrastructure/Cache/UserCache.js";
import { UserQueue } from "#Infrastructure/Queue/Queues/UserQueue.js";
import { UserWorker } from "#Infrastructure/Queue/Workers/UserWorker.js";
import { IUserRepository } from "#Application/Interfaces/Repository/IUserRepository.js";
import { TestController } from "#API/Controllers/TestController.js";
import { UserCron } from "#Infrastructure/Cron/UserCron.js";

const container = new Container();

// Bind controllers
container.bind<UserController>(DITypes.UserController).to(UserController).inSingletonScope();
container.bind<TestController>(DITypes.TestController).to(TestController).inSingletonScope();

// Bind Services
container.bind<IUserService>(DITypes.UserService).to(UserService).inSingletonScope();

// Bind Routes
container.bind<AppRoutes>(DITypes.AppRoutes).to(AppRoutes).inSingletonScope();
container.bind<UserRoutes>(DITypes.UserRoutes).to(UserRoutes).inSingletonScope();

// Bind Repositories
container.bind<PrismaClient>(DITypes.PrismaClient).toConstantValue(new PrismaClient());
container.bind<IUserRepository>(DITypes.UserRepository).to(UserRepository).inSingletonScope();

// Bind Caches
container.bind<UserCache>(DITypes.UserCache).to(UserCache).inSingletonScope();

// Bind Queues
container.bind<UserQueue>(DITypes.UserQueue).to(UserQueue).inSingletonScope();

// Bind Workers
container.bind<UserWorker>(DITypes.UserWorker).to(UserWorker).inSingletonScope();

// Bind Crons
container.bind<UserCron>(DITypes.UserCron).to(UserCron).inSingletonScope();

export { container };
