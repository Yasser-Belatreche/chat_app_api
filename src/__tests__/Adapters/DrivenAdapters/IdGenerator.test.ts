import { expect } from "chai";

import type { IIdGenerator } from "../../../Ports/DrivenPorts/IdGenerator/IdGenerator.interface";

import { IdGeneratorFake } from "../../__fakes__/dependencies/IdGenerator";
import { IdGenerator } from "../../../Adapters/DrivenAdapters/IdGenerator";

const handler = (idGenerator: IIdGenerator) => () => {
  it("calling generate should generate a random id everytime", () => {
    expect(idGenerator.generate())
      .to.not.equal(idGenerator.generate())
      .to.not.equal(idGenerator.generate())
      .to.not.equal(idGenerator.generate())
      .to.not.equal(idGenerator.generate())
      .to.not.equal(idGenerator.generate());
  });
};

describe("IdGenerator", () => {
  describe("Fake", handler(new IdGeneratorFake()));
  describe("Real", handler(new IdGenerator()));
});
