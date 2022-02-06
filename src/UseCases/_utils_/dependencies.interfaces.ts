import { PasswordManager } from "../../Ports/DrivenPorts/PasswordManager/passwordManager.interface";
import { UsersRepository } from "../../Ports/DrivenPorts/persistence/persistence.interface";
import { TokenManager } from "../../Ports/DrivenPorts/TokenManager/tokenManager.interface";

export interface WithUsersRespository {
  usersRepository: UsersRepository;
}

export interface WithPasswordManager {
  passwordManager: PasswordManager;
}

export interface WithTokenManager {
  tokenManager: TokenManager;
}
