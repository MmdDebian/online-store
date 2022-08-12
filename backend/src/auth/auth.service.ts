import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserDto } from 'src/users/user-dto/createUserDto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private userService : UsersService
    ){}

    private async validateUser(email:string , password:string):Promise<User | null>{
        const user = await this.userService.findByEmail(email);

        if(!user){
            return null
        }

        if(password !== user.password){
            return null 
        }

        return user ;
    }


    async register(createUserDto:CreateUserDto):Promise<User | null>{
        const user = await this.userService.findByEmail(createUserDto.email);

        if(user){
            return null;
        }

        const result = await this.userService.create(createUserDto);

        return result ;
    }

    async login(email:string , password:string):Promise<User | null>{
        const user = await this.validateUser(email , password);

        if(!user){
            return null 
        }

        return user ; 
    }
}
