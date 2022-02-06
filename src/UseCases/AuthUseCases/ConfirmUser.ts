import { User } from "../../Domain/User/User";

type Dependencies = {};

interface Args {}

const makeConfirmUser =
  ({}: Dependencies) =>
  async ({}: Args) => {
    return new User({ email: "", password: "" });
  };

export { makeConfirmUser };
