import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { Prisma } from '@prisma/client';
import { ApiBearerAuth, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { jwtConstants } from 'src/auth/constants';
import { JwtService } from '@nestjs/jwt';

@ApiTags('notification/system')
@ApiBearerAuth()
@ApiUnauthorizedResponse({
  description: 'Unauthorized Bearer Auth'
})
@Controller('notification/system')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService, private jwtService: JwtService) { }

  //   {
  //     "event_name": "EVENT_OCCURRED", 
  //   "type_notification": "batch",
  //   "content" : "asdasdasd",
  //   "iduser": "asdasd"
  // }

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createNotificationDto: Prisma.NotificationCreateInput, @Request() req) {

    const [type, token] = req.headers.authorization?.split(' ') ?? [];
    const payload = this.jwtService.verify(
      token,
      {
        secret: jwtConstants.secret
      }
    );

    if (!createNotificationDto.iduser)
      createNotificationDto.iduser = String(payload.userId)
    return this.notificationService.create(createNotificationDto);
  }


  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.notificationService.findAll();
  }

  @Get('user/auth')
  @UseGuards(AuthGuard)
  profile(@Request() req) {
    return this.notificationService.findUser(+req.user.userId)
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.notificationService.findOne(+id);
  }

  @Get('/user/:id')
  @UseGuards(AuthGuard)
  findUser(@Param('id') id: string) {
    return this.notificationService.findUser(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateNotificationDto: Prisma.NotificationUpdateInput) {
    return this.notificationService.update(+id, updateNotificationDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.notificationService.remove(+id);
  }



}
