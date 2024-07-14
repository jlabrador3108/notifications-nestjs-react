import { Injectable } from '@nestjs/common';
import { EmailQueueService } from './emailQueue.service';
import { SendEmailService } from './sendEmail.service';
import { CreateNotificationEmailDto } from '../dto/create-notification.dto';

@Injectable()
export class EmailService {
    constructor(private readonly emailQueueService: EmailQueueService,
        private readonly emailService: SendEmailService) { }

    async sendEmail(email: CreateNotificationEmailDto) {

        if (email.email && email.content && email.event_name && email.type_notification) {

            if (String(email.type_notification) === String("instantly")) {
                await this.emailService.sendMail(
                    String(email.email),
                    String(email.event_name),
                    String(email.content),
                );

                return { message: "email sent" }
            }

            if (String(email.type_notification) === String("batch")) {
                return this.emailQueueService.addNotification(email)
            }

        } else {
            return {
                error: "error sending email, incorrect data", message: "should follow a structure like this " +
                    `{event_name: 5,  type_notification: batch, content : hi email, email: test@test.com }`
            }
        }


    }

}
