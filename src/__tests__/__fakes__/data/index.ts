import { getMessageFakeInfo } from "./messageFakeInfo";
import { getUserFakeInfo } from "./userFakeInfo";

const getFakeData = () => ({
  get userFakeInfo() {
    return getUserFakeInfo();
  },

  get messageFakeInfo() {
    return getMessageFakeInfo();
  },
});

export { getFakeData };
