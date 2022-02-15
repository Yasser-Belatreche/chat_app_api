export interface EmailService {
  send: (args: { to: string; HTMLTemplate: string }) => Promise<void>;
}
