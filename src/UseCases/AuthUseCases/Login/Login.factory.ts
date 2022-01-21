import { User } from "../../../Entities/User/User";

interface Dependencies {}

interface Args {
  name: string;
  phoneNumber: string;
  password: string;
}

const makeLogin =
  ({}: Dependencies) =>
  (args: Args) => {
    const user = new User(args);
  };

export { makeLogin };
