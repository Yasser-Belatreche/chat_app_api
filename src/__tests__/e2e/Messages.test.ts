/**
 * 6 - the two users open the conversation again, and find the old messages
 */

import chai, { expect } from "chai";
import _ from "chai-http";
import Sinon from "sinon";

import { ConfirmationCodesPersistencePostgresFacade } from "../../Adapters/DrivenAdapters/Persistence/ConfirmationCodes/ConfirmationCodesPersistenceFacade";
import { MessagesPresistencePostgresFacade } from "../../Adapters/DrivenAdapters/Persistence/Messages/MessagesPersistenceFacade";
import { UsersPersistencePostgresFacade } from "../../Adapters/DrivenAdapters/Persistence/Users/UsersPersistenceFacade";
import { EmailService } from "../../Adapters/DrivenAdapters/EmailService";

import { confirmationCodesGateway } from "../../Ports/DrivenPorts/Persistence/Persistence";

import { getFakeData } from "../__fakes__/data";
import { server } from "./setup/server";

describe("Sending, Receiving and Getting Messages", () => {
  const fakeData = getFakeData();

  let sendEmailStub: Sinon.SinonStub;

  const { userFakeInfo: user1 } = fakeData;
  const { userFakeInfo: user2 } = fakeData;
  let token1: string;
  let token2: string;

  beforeEach(() => {
    sendEmailStub = Sinon.stub(EmailService.prototype, "send");
  });

  afterEach(() => {
    sendEmailStub.restore();
  });

  after(() => {
    server.close();

    new UsersPersistencePostgresFacade().deleteAll();
    new ConfirmationCodesPersistencePostgresFacade().deleteAll();
    new MessagesPresistencePostgresFacade().deleteAll();
  });

  it("two users register", (done) => {
    chai
      .request(server)
      .post("/api/auth/register")
      .send(user1)
      .end((err, res) => {
        if (err) console.log(err);
        token1 = res.body.data;
      });

    chai
      .request(server)
      .post("/api/auth/register")
      .send(user2)
      .end((err, res) => {
        if (err) console.log(err);
        token2 = res.body.data;

        done();
      });
  });

  it("confirm there emails", (done) => {
    Promise.all([
      confirmationCodesGateway.find(user1.email.toLowerCase()),
      confirmationCodesGateway.find(user2.email.toLowerCase()),
    ]).then(([code1, code2]) => {
      chai
        .request(server)
        .put("/api/auth/confirmUser")
        .send({ code: code1?.code })
        .set("authorization", token1)
        .end();
      chai
        .request(server)
        .put("/api/auth/confirmUser")
        .send({ code: code2?.code })
        .set("authorization", token2)
        .end((err, res) => done());
    });
  });

  it("the first user search for the second one", (done) => {
    chai
      .request(server)
      .get("/api/users/search")
      .query({ q: user2.name.slice(0, 4) })
      .set("authorization", token1)
      .end((err, res) => {
        if (err) console.log(err);

        expect(res.body).to.have.property("success", true);
        expect(res.body).to.have.property("data").to.be.an("array");
        expect(res.body.data[0]).to.have.property(
          "name",
          user2.name.toLowerCase()
        );

        user2.userId = res.body.data[0].userId;

        done();
      });
  });

  it("the first user send some messages to the second user", (done) => {
    for (let i = 1; i <= 10; i++)
      chai
        .request(server)
        .post("/api/messages/send")
        .send({ content: `${i}`, receiverId: user2.userId })
        .set("authorization", token1)
        .end((err, res) => {
          if (err) console.log(err);
          expect(res.body).to.have.property("success", true);

          i == 10 && done();
        });
  });

  it("second user receive the messages", (done) => {
    chai
      .request(server)
      .get("/api/users/contacts")
      .set("authorization", token2)
      .end((err, res) => {
        if (err) console.log(err);

        expect(res.body).to.have.property("success", true);
        expect(res.body.data).to.have.lengthOf(1);
        expect(res.body.data[0].latestMessage).to.have.property(
          "content",
          "10"
        );
        expect(res.body.data[0].contact).to.have.property(
          "name",
          user1.name.toLowerCase()
        );

        user1.userId = res.body.data[0].contact.userId;

        done();
      });
  });

  it("second user send some message back", (done) => {
    for (let i = 1; i <= 10; i++)
      chai
        .request(server)
        .post("/api/messages/send")
        .send({ content: `${i}`, receiverId: user1.userId })
        .set("authorization", token2)
        .end((err, res) => {
          if (err) console.log(err);
          expect(res.body).to.have.property("success", true);

          i == 10 && done();
        });
  });

  it("first user receive those messages", (done) => {
    chai
      .request(server)
      .get("/api/users/contacts")
      .set("authorization", token1)
      .end((err, res) => {
        if (err) console.log(err);

        expect(res.body).to.have.property("success", true);
        expect(res.body.data).to.have.lengthOf(1);
        expect(res.body.data[0].latestMessage).to.have.property(
          "content",
          "10"
        );
        expect(res.body.data[0].contact).to.have.property(
          "name",
          user2.name.toLowerCase()
        );

        done();
      });
  });

  it("the two users open the conversation again, and find the old messages", (done) => {
    chai
      .request(server)
      .get("/api/messages/conversation")
      .set("authorization", token1)
      .query({ chatParticipantId: user2.userId })
      .end((err, res) => {
        if (err) console.log(err);
        expect(res.body).to.have.property("success", true);
        expect(res.body).to.have.property("data").to.be.an("array");
        expect(res.body.data).to.have.lengthOf(20);

        expect(res.body.data[0]).to.have.property("content", "10");
        expect(res.body.data[0]).to.have.property("senderId", user2.userId);

        expect(res.body.data[19]).to.have.property("content", "1");
        expect(res.body.data[19]).to.have.property("senderId", user1.userId);

        done();
      });
  });
});
