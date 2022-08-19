import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private reflector:Reflector){

  }
  canActivate(
    context: ExecutionContext,
  ): boolean {
    const [req] = context.getArgs();
    const admin = req?.user?.role ;


    if(admin === 'ADMIN'){
      return true
    }

    throw new ForbiddenException
  }
}
