export interface IEmailService {
  send(args: {
    to: string;
    HTMLTemplate: string;
    title: string;
  }): Promise<void>;
}
