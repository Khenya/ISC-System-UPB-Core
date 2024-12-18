import mailerPlugin from '../plugin/mailer/mailerPlugin';
import { MailOptions } from '../types/mailerTypes';

export const sendMail = async (options: MailOptions): Promise<void> => {
  await mailerPlugin.sendMail(options);
};

export const sendStudentReviewEmail = async (
  studentEmail: string,
  studentName: string,
  subject: string,
  textHtml: string
): Promise<void> => {
  const options: MailOptions = {
    to: studentEmail,
    recipientName: studentName,
    subject,
    html: textHtml,
  };

  await sendMail(options);
};
