// describe("UsersUseCases", () => {
//   let authUser: any, randomUsers: { user: IUser; token: string }[];

//   before(async () => {
//     authUser = await registerAndConfirmRandomUser();
//     randomUsers = await register4RandomUsers();
//   });

//   describe("Getting Contacts List", () => {
//     let authToken: string;

//     before(async () => {
//       authToken = (await authUser).token;
//     });

//     it("should not be able to get contacts with an unvalid token", async () => {
//       await expect(getContactsList({ authToken: "wrongToken" })).to.be.rejected;
//     });

//     it("should get an empty list when the user didn't send any message", async () => {
//       await expect(getContactsList({ authToken })).to.eventually.have.length(0);
//     });

//     it("when the user send some messages to 1 user, should get a list of length 1", async () => {
//       for (let i = 0; i < 3; i++) {
//         await sendMessage({
//           authToken,
//           receiverId: randomUsers[0].user.userId,
//           content: "eh",
//         });
//       }
//       await expect(getContactsList({ authToken })).to.eventually.have.length(1);
//     });

//     it("the number of contacts should be equal to the number of users that the authUser talked with before", async () => {
//       for (let i = 0; i < 3; i++) {
//         await sendMessage({
//           authToken,
//           receiverId: randomUsers[i].user.userId,
//           content: "eh",
//         });
//       }
//       await expect(getContactsList({ authToken })).to.eventually.have.length(3);
//     });

//     it("should get the latestMessage information along with the contact information, sorted by the latest message send date", async () => {
//       const receiver = randomUsers[2];

//       await sendMessage({
//         authToken,
//         receiverId: receiver.user.userId,
//         content: "hello user 2",
//       });
//       const contactsList = await getContactsList({ authToken });

//       expect(contactsList[0].latestMessage.content).to.equal("hello user 2");
//       expect(contactsList[0].contact?.userId).to.equal(receiver.user.userId);
//     });
//   });
// });

// const register4RandomUsers = async () => {
//   return await Promise.all([
//     registerAndConfirmRandomUser(),
//     registerAndConfirmRandomUser(),
//     registerAndConfirmRandomUser(),
//     registerAndConfirmRandomUser(),
//   ]);
// };
