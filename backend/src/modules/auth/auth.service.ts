import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import { sign } from 'jsonwebtoken' ;
import { compare } from 'bcrypt';
import { User  } from '@prisma/client';
import { RegisterDto } from './auth-dto/registerDto';
import { LoginDto } from './auth-dto/loginDto';

@Injectable()
export class AuthService {
    constructor(private userService:UsersService){}

    private async generateToken(user:User):Promise<any>{
        return await sign({userId:user.id} , process.env.JWT_KEY , {expiresIn : '2h'});
    }

    private async comparePassword(password:string , hash:string):Promise<boolean | null>{
        return new Promise((resolve, reject) => {
            compare(password , hash)
            .then(same=>{
                if(!same) return resolve(null);
                resolve(same);
            })
            .catch((err)=>reject(err))
        });
    }

    async register(registerDto:RegisterDto):Promise<any>{
        const user = await this.userService.findByEmail(registerDto.email);

        if(user) return null ;

        const newUser = await this.userService.create(registerDto);

        const token = await this.generateToken(newUser);

        return {token} ;
    }

    async login(loginDto:LoginDto):Promise<any>{
        const user = await this.userService.findByEmail(loginDto.email);

        if(!user) return null ;

        const isValid = await this.comparePassword(loginDto.password , user.password);

        if(!isValid) return null ;

        const token = await this.generateToken(user);

        return {token} ;
    }
}
