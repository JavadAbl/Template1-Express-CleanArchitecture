import { inject, injectable } from "inversify";
import { BaseWorker } from "./BaseWorker.js";
import { UserQueue } from "../Queues/UserQueue.js";
import { UserContract, UserJobs } from "../Jobs/UserJobsContract.js";
import { UserService } from "#Application/Services/UserService.js";

@injectable()
export class UserWorker extends BaseWorker<UserContract> {
  constructor(@inject(UserService) userService: UserService) {
    const jobs = {
      [UserJobs.CreateUser]: async (data) => userService.create.bind(userService)(data),
    };

    super(UserQueue.name, jobs);
  }
}
