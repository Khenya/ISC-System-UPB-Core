export interface MailOptions {
  to: string;
  recipientName: string;
  subject: string;
  text?: string;
  html?: string;
}

export interface MailerPlugin {
  sendMail(options: MailOptions): Promise<void>;
}
