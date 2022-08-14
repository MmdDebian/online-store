import { Module } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports :[],
    controllers : [AuthController] ,
    providers : [UsersService ,AuthService] , 
    exports : []
})

export class AuthModule {}
