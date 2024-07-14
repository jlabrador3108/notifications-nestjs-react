import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class SendEmailService {
    private transporter: nodemailer.Transporter;

    constructor(private configService: ConfigService) {

        this.transporter = nodemailer.createTransport({
            service: this.configService.get('SERVICE'),
            auth: {
                user: this.configService.get('USER_EMAIL'),
                pass: this.configService.get('USER_PASS'),
            },
        });
    }

    async sendMail(to: string, subject: string, text: string) {
        const mailOptions = {
            from: '"TEST" <' + this.configService.get('USER_EMAIL') + '>',
            to: to,
            subject: subject,
            text: text,
            // html: `<b>${text}</b>`,
        };

        try {
            await this.transporter.sendMail(mailOptions);
            console.log('Message sent successfully!');
        } catch (error) {
            console.error('Error occurred while sending email:', error);
        }
    }
}
