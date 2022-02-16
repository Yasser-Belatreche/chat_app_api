import { IUser } from "../../Domain/User/User.Factory";
import { UserInfo } from "./types";

const getUsersInfoFromClasses = (users: IUser[]): UserInfo[] => {
  return users.map((user) => getUserInfoFromClass(user));
};

const getUserInfoFromClass = (user: IUser): UserInfo => {
  return {
    userId: user.userId,
    name: user.name,
    email: user.email,
    isConfirmed: user.isConfirmed,
    createdAt: user.createdAt,
  };
};

export { getUserInfoFromClass, getUsersInfoFromClasses };
