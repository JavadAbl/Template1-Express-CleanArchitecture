import { User } from "#Domain/Entity/User.js";

export type IUserDto = Omit<User, "password">;

export function toUserDto(user: User): IUserDto {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...dto } = user;
  return dto as IUserDto;
}
