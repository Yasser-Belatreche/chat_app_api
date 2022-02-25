import { expect } from "chai";
import Sinon from "sinon";

import { ConfirmationCodesGateway } from "../../../../../../Adapters/DrivenAdapters/Persistence/ConfirmationCodes/ConfirmationCodesGateway";
import { ConfirmationCode } from "../../../../../../Domain/ConfirmationCode";
import { IConfirmationCode } from "../../../../../../Domain/ConfirmationCode/ConfirmationCode.types";

import { getFakeData } from "../../../../../__fakes__/data";

describe("ConfirmationCodesGateway", () => {
  const confirmationCodesPersistence: any = class {};
  const confirmationCodesGateway = new ConfirmationCodesGateway(
    new confirmationCodesPersistence()
  );

  let confirmationCode: IConfirmationCode;

  const getNewCode = () => {
    const fakeData = getFakeData();
    const confirmationCode = new ConfirmationCode(fakeData.userFakeInfo.email);

    confirmationCode.newCode();
    return confirmationCode;
  };

  beforeEach(() => {
    confirmationCode = getNewCode();
  });

  it("should save a confirmation code and return the confirmationCode entity", async () => {
    confirmationCodesPersistence.prototype.add = Sinon.stub().resolves(
      confirmationCode.codeInfo()
    );

    const returnedCode = await confirmationCodesGateway.add(confirmationCode);

    expect(confirmationCodesPersistence.prototype.add.calledOnce).to.be.true;
    expect(returnedCode.codeInfo()).to.deep.equal(confirmationCode.codeInfo());
  });

  it("should return undefined when trying to get a code that not exist", async () => {
    confirmationCodesPersistence.prototype.find =
      Sinon.stub().resolves(undefined);

    const code = await confirmationCodesGateway.find(confirmationCode.email);

    expect(confirmationCodesPersistence.prototype.find.calledOnce).to.be.true;
    expect(code).to.be.undefined;
  });

  it("should return the confirmation code entity with the data when the code exist", async () => {
    confirmationCodesPersistence.prototype.find = Sinon.stub().resolves(
      confirmationCode.codeInfo()
    );

    const code = await confirmationCodesGateway.find(confirmationCode.email);

    expect(confirmationCodesPersistence.prototype.find.calledOnce).to.be.true;
    expect(code?.codeInfo()).to.deep.equal(confirmationCode.codeInfo());
  });

  it("should update the confirmation code and return the updated entity", async () => {
    confirmationCodesPersistence.prototype.update = Sinon.stub().resolves(
      confirmationCode.codeInfo()
    );

    const code = await confirmationCodesGateway.update(confirmationCode);

    expect(confirmationCodesPersistence.prototype.update.calledOnce).to.be.true;
    expect(code?.codeInfo()).to.deep.equal(confirmationCode.codeInfo());
  });

  it("should delete a confirmationcode and return the deleted entity", async () => {
    confirmationCodesPersistence.prototype.delete = Sinon.stub().resolves(
      confirmationCode.codeInfo()
    );

    const code = await confirmationCodesGateway.delete(confirmationCode.email);

    expect(confirmationCodesPersistence.prototype.delete.calledOnce).to.be.true;
    expect(code.codeInfo()).to.deep.equal(confirmationCode.codeInfo());
  });
});
