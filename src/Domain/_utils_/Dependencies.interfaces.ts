import type { IIdGenerator } from "../../Ports/DrivenPorts/IdGenerator/IdGenerator.interface";

export interface WithIdGenerator {
  idGenerator: IIdGenerator;
}
