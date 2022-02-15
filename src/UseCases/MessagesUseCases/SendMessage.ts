type Dependencies = {};

interface Args {
  authToken: string;
  to: string;
  message: string;
}

const makeSendMessage = ({}: Dependencies) => {
  return async ({}: Args) => {};
};

export { makeSendMessage };
