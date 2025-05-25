// services/email.service.ts
import nodemailer, { Transporter } from 'nodemailer';
import { MailOptions } from '../types/email.interface';

export class EmailService {
    private transporter: Transporter;

    constructor(transporter: Transporter) {
        this.transporter = transporter;
    }

    public async sendEmail(options: MailOptions): Promise<void> {
        const mail = {
            from: '"Your App" <no-reply@yourapp.com>',
            to: Array.isArray(options.to) ? options.to.join(', ') : options.to,
            subject: options.subject,
            text: options.text,
            html: options.html,
        };

        try {
            const info = await this.transporter.sendMail(mail);
            console.log(`Email sent: ${info.messageId}`);
            console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
        } catch (error) {
            console.error('Failed to send email:', error);
            throw error;
        }
    }
}
