export const DITypes = {
  //Database
  PrismaClient: Symbol.for("PrismaClient"),
  UserRepository: Symbol.for("UserRepository"),

  //Controllers
  UserController: Symbol.for("UserController"),

  //Services
  UserService: Symbol.for("UserService"),

  //Routes
  AppRoutes: Symbol.for("AppRoutes"),
  UserRoutes: Symbol.for("UserRoutes"),

  //Caches
  UserCache: Symbol.for("UserCache"),
};

Object.freeze(DITypes);
