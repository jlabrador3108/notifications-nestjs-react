import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EmailController } from './email/email.controller';
import { EmailService } from './email/email.service';
import { EmailQueueService } from './email/emailQueue.service';
import { BullModule } from '@nestjs/bull';
import { SendEmailService } from './email/sendEmail.service';

@Module({
  imports: [PrismaModule, BullModule.registerQueue({
    name: 'notifications',
  })],
  controllers: [NotificationController, EmailController],
  providers: [NotificationService, EmailService, EmailQueueService, SendEmailService],
})
export class NotificationModule { }
