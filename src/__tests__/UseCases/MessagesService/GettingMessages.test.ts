// import { expect } from "chai";

// describe("MessagesService - Getting Messages", () => {
//   it("should get the latest 20 message between the two target users", async () => {
//     const messages = await getMessages({
//       authToken: sender_1.token,
//       chatParticipantId: receiver_1.user.userId,
//     });

//     expect(messages).to.have.lengthOf(20);
//     expect(messages[0]).to.have.property("content", "30");
//     expect(messages[messages.length - 1]).to.have.property("content", "11");
//     messages.map((message) => {
//       expect(message).to.have.property("senderId", sender_1.user.userId);
//       expect(message).to.have.property("receiverId", receiver_1.user.userId);
//     });
//   });

//   it("should be able to customize the number of messages returned, also the number of messages chunk", async () => {
//     const messages = await getMessages({
//       authToken: sender_1.token,
//       chatParticipantId: receiver_1.user.userId,
//       numOfChunk: 2,
//       numOfMessagesPerChunk: 5,
//     });
//     expect(messages).to.have.lengthOf(5);
//     expect(messages[0]).to.have.property("content", "25");
//     expect(messages[messages.length - 1]).to.have.property("content", "21");
//   });
// });
