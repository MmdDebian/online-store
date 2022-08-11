import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Module({
  imports : [
    UsersModule ,
    PassportModule ,
    JwtModule.register({
      secret : 'qwelfhqwkejhfwhgfwqhegfqefwefh345434ew3' ,
      signOptions : {expiresIn : '20h'}
    })
  ] ,
  providers: [AuthService , UsersService , LocalStrategy],
  controllers: [AuthController] ,
  exports : [AuthService]
})
export class AuthModule {}
