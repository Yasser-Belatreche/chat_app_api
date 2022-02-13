import { User } from "../../Domain/User/User";

type Dependencies = {};

interface Args {
  authToken: string;
  code: number;
}

const makeConfirmUser =
  ({}: Dependencies) =>
  async ({ authToken, code }: Args) => {
    return new User({ email: "", password: "" });
  };

export { makeConfirmUser };
