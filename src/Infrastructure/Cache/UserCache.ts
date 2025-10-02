import { injectable } from "inversify";
import { BaseCache } from "./BaseCache.js";

@injectable()
export class UserCache extends BaseCache {
  constructor() {
    super("user");
  }

  // Add user-specific helpers only if needed
  // e.g. a method that composes a more complex key
}
