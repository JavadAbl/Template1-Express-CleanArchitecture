import { SUserCreate } from "#API/Schema/User/SUserCreate.js";
import z from "zod";

export type IUserCreateDto = z.infer<typeof SUserCreate>;
