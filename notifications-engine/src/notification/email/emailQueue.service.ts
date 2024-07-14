// notifications.service.ts
import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { ConfigService } from '@nestjs/config';
import { SendEmailService } from './sendEmail.service';
import { NotificationEmail } from '../entities/notification.entity';

@Injectable()
export class EmailQueueService {
    private notificationsGroups: Map<string, Array<NotificationEmail>> = new Map();

    constructor(@InjectQueue('notifications') private notificationsQueue: Queue<NotificationEmail>,
        private configService: ConfigService, private readonly emailService: SendEmailService
    ) { }


    async addNotification(notification: NotificationEmail) {

        let group = this.notificationsGroups.get(notification.email + '-' + notification.event_name);
        let groupAux = [];
        if (!group) {
            groupAux.push(notification);
            this.notificationsGroups.set(notification.email + '-' + notification.event_name, groupAux);
        } else {
            groupAux = this.notificationsGroups.get(notification.email + '-' + notification.event_name)
            groupAux.push(notification);
            this.notificationsGroups.set(notification.email + '-' + notification.event_name, groupAux);
        }


        // CANT_NOTIFICATIONS=5
        // MAX_TIME=2
        if (groupAux.length === 1) {

            let delay = +this.configService.get('MAX_TIME') * 3600000;
            setTimeout(() => {
                this.processGroup(groupAux)
            }, delay);

        }
        if (groupAux.length >= 5) {
            return this.processGroup(groupAux)
        }

        return { message: "batch uploaded mail" }
    }

    async processGroup(group: NotificationEmail[]) {
        if (group.length !== 0) {

            let notificationToSend = group[0];
            notificationToSend['content'] = "";
            group.map(not => {
                notificationToSend['content'] = not.content
            })
            group = [];
            this.notificationsGroups.set(notificationToSend.email + '-' + notificationToSend.event_name, group);

            await this.emailService.sendMail(
                String(notificationToSend.email),
                String(notificationToSend.event_name),
                String(notificationToSend.content),
              );

            return { message: "batch shipped" }
        }

    }
}
