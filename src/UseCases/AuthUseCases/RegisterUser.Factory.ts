import { User } from "../../Domain/User/User";

type Dependencies = {
  usersRepository: UsersRepository;
};

interface Args {
  name: string;
  email: string;
  password: string;
}

const makeRegisterUser = ({ usersRepository }: Dependencies) => {
  return async (args: Args) => {
    const user = new User({ email: args.email, password: args.password });
    user.name = args.name;
    user.generateIdAndCreationTime();

    return await usersRepository.add(user);
  };
};

export { makeRegisterUser };
