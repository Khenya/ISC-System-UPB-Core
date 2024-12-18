import * as mailerService from '../services/mailerService';

export const sendEmail = async (emailData: { subject: string; textHtml: string }) => {
  try {
    await mailerService.sendStudentReviewEmail(
      'paulwilkerlf@gmail.com',
      'Paul',
      emailData.subject,
      emailData.textHtml
    );
  } catch (error) {
    throw new Error(error as string);
  }
};
