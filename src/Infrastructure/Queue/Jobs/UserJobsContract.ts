// UserJobsContract.ts

import { IRegisterUser } from "#API/Interfaces/Dto/User/IUserCreateDto.js";
import { JobContract } from "./JobContract.js";

export enum UserJobs {
  CreateUser = "create-user",
}

export interface UserPayloads {
  [UserJobs.CreateUser]: IRegisterUser;
}

export type UserContract = JobContract<UserJobs, UserPayloads>;
