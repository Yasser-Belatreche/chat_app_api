import { getFakeConfirmationCodeInfo } from "./confimationCodeFakeInfo";
import { getMessageFakeInfo } from "./messageFakeInfo";
import { getUserFakeInfo } from "./userFakeInfo";

const getFakeData = () => ({
  get userFakeInfo() {
    return getUserFakeInfo();
  },

  get messageFakeInfo() {
    return getMessageFakeInfo();
  },

  get confirmationCodeFakeInfo() {
    return getFakeConfirmationCodeInfo();
  },
});

export { getFakeData };
