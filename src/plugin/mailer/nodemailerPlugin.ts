import nodemailer, { Transporter } from 'nodemailer';
import config from '../../config/config';
import { MailerPlugin, MailOptions } from '../../types/mailerTypes';

const { mailer } = config;

const transporter: Transporter = nodemailer.createTransport({
  service: mailer.emailService,
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: mailer.emailUser,
    pass: mailer.emailPass,
  },
});

export const nodemailerPlugin: MailerPlugin = {
  sendMail: async ({ to, recipientName, subject, text, html }: MailOptions): Promise<void> => {
    const mailOptions = {
      from: mailer.emailUser,
      to,
      subject,
      text,
      html,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Correo enviado: ' + info.response);
    } catch (error) {
      console.error('Error al enviar el correo:', error);
    }
  }
};