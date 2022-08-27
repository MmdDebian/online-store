import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports :[],
    controllers : [AuthController] ,
    providers : [PrismaService,UsersService ,AuthService] , 
    exports : []
})

export class AuthModule {}
