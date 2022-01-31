import { expect } from "chai";
import faker from "faker";

import { makeLogin } from "../../UseCases/AuthUseCases/Login.Factory";
import { makeRegisterUser } from "../../UseCases/AuthUseCases/RegisterUser.Factory";

const registerUser = makeRegisterUser();
const login = makeLogin();

describe("AuthUseCase", () => {
  it("should be able to login after registration", async () => {
    const user = {
      name: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    await registerUser(user);
    const userToken = await login({
      email: user.email,
      password: user.password,
    });
    expect(userToken).to.be.a("string").to.include("Bearer ");
  });
});
