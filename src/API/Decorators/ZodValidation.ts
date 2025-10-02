import { AppError } from "#Globals/Utils/AppError.js";
import status from "http-status";
import { ZodType, ZodError } from "zod";
import { Request } from "express";

export function zodValidation(schema: ZodType<any>, dtoLocation: "body" | "params" | "query" = "body") {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      try {
        const req: Request = args[0];
        let dto = req[dtoLocation];

        if (!dto || !Object.keys(dto).length) {
          dto = undefined;
        }

        const parsedDto = await schema.safeParseAsync(dto);
        console.log(parsedDto.data);

        if (parsedDto.data) req[dtoLocation] = parsedDto.data;
        return originalMethod.apply(this, args);
      } catch (error: any) {
        if (error instanceof ZodError) {
          const message = error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`).join("; ");
          throw new AppError(`Validation failed: ${message}`, status.BAD_REQUEST);
        }

        throw new AppError(`Validation failed: ${error.message}`, status.BAD_REQUEST);
      }
    };

    return descriptor;
  };
}
