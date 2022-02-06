import { getUser } from "./user";

const getFakeData = () => ({
  get user() {
    return getUser();
  },
});

export { getFakeData };
