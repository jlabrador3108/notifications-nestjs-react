import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.services';

@Injectable()
export class NotificationService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createNotificationDto: Prisma.NotificationCreateInput) {
    if (createNotificationDto.content && createNotificationDto.event_name && createNotificationDto.type_notification) {
      return this.prisma.notification.create({ data: createNotificationDto });
    } else {
      return {
        error: "error sending email, incorrect data", message: "should follow a structure like this " +
          `{event_name: 5,  type_notification: batch, content : hi system}`
      }
    }
  }

  async findAll() {
    return this.prisma.notification.findMany();
  }

  async findUser(id) {
    return this.prisma.notification.findMany({
      where: {
        iduser: String(id)
      }
    });
  }

  async findOne(id: number) {
    return this.prisma.notification.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateNotificationDto: Prisma.NotificationUpdateInput) {
    return this.prisma.notification.update({
      where: {
        id
      },
      data: updateNotificationDto
    });
  }

  async remove(id: number) {
    return this.prisma.notification.delete({
      where: {
        id
      }
    });
  }
}
