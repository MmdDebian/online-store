import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { Request , Response , NextFunction } from 'express' ;
import * as jwt from 'jsonwebtoken';
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private userService:UsersService){}
    async use(req:Request, res:Response, next:NextFunction){
        const token:any = req.headers['x-auth-token'];

        try{
            if(!token){
                throw new UnauthorizedException();
            }
            const decode:any = await jwt.verify(token , process.env.JWT_KEY);
    
            const user = await this.userService.findOne(decode.userId);
    
            if(!user){
                throw new UnauthorizedException();
            }
            console.log(user)
            req.user = user ;
            next();
        }
        catch(err){
            console.log(err)
            throw new UnauthorizedException();
        }
    }
}