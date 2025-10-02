import { SGetById } from "#API/Schema/Shared/SGetById.js";
import z from "zod";

export type IGetByIdDto = z.infer<typeof SGetById>;
