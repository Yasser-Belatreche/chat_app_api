import type { IdGenerator } from "../../Ports/DrivenPorts/IdGenerator/IdGenerator.interface";

export interface WithIdGenerator {
  idGenerator: IdGenerator;
}
