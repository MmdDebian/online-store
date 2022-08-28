import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { LoginDto } from './auth-dto/loginDto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    @Post('register')
    async register(@Body() body:CreateUserDto):Promise<string | HttpException>{
        const result = await this.authService.register(body);

        if(!result){
            throw new HttpException('email or password is invalid' , HttpStatus.BAD_REQUEST);
        }

        return result ;
    }

    @Post('login')
    async login(@Body() body:LoginDto):Promise<string | HttpException>{
        
        const result = await this.authService.login(body);

        if(!result){
            throw new HttpException('email or password is invalid' , HttpStatus.BAD_REQUEST);
        }

        return result;
    }
}
