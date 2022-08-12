import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/users/user-dto/createUserDto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private authService:AuthService
    ){}

    @Post('register')
    async register(@Body() body , createUserDto:CreateUserDto){
        const user = await this.authService.register(createUserDto);

        if(!user){
            throw new HttpException('email or password not valid' , HttpStatus.BAD_REQUEST);
        }
    }
}
