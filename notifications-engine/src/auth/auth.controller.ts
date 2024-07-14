import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthEntity } from './entities/auth.entity';

@ApiTags('auth {username:user password:123456}')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto:AuthEntity) {
        return this.authService.signIn(signInDto.username, signInDto.password);
    }
}