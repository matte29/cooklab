import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signUp')
    signup(
        @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
    ): Promise<void> {
        return this.authService.signup(authCredentialsDto);
    }

    @Post('/signIn')
    login(
        @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
    ): Promise<{ accessToken: string }> {
        return this.authService.login(authCredentialsDto);
    }
}
