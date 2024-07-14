import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { EmailService } from './email.service';
import { ApiBearerAuth, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { CreateNotificationEmailDto } from '../dto/create-notification.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('notification/email')
@ApiBearerAuth()
@ApiUnauthorizedResponse({
    description: 'Unauthorized Bearer Auth'
})
@Controller('notification/email')
export class EmailController {
    constructor(private readonly emailService: EmailService) { }
    @Get()
    @UseGuards(AuthGuard)
    getEmailNotifications() {
        return [{ message: 'active system' }];
    }

    @Post()
    @UseGuards(AuthGuard)
    sendEmail(@Body() email: CreateNotificationEmailDto) {
        return this.emailService.sendEmail(email);
    }
}
