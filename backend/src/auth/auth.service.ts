import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UsersService } from 'src/users/users.service';


@Injectable()
export class AuthService {
    constructor(
        private usersService : UsersService ,
        private jwtService : JwtService 
    ){}


    async validateUser(email:string, password:string):Promise<any>{
        const user = await this.usersService.findByEmail(email)
        console.log('test')
        if(!user) return null ;

        console.log(user);

        if(password != user.password){
            return null;
        }

        return user ;
    }

    async login(user:User){
        const payload = { email : user.email , id : user.id };

        return {
            token : this.jwtService.sign(payload)
        }
    }
}
