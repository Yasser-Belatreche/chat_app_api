export interface EmailService {
  send: (args: { email: string; HTMLTemplate: string }) => Promise<void>;
}
