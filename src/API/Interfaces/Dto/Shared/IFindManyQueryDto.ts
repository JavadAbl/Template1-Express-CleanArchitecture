import { SFindManyQuery } from "#API/Schema/Shared/SFindManyQuery.js";
import z from "zod";

export type IFindManyQueryDto = z.infer<typeof SFindManyQuery>;
