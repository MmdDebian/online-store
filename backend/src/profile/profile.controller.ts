import { Controller, Get, Req } from '@nestjs/common';
import { User } from '@prisma/client';

@Controller('profile')
export class ProfileController {
    constructor(){

    }

    @Get('')
    async index(@Req() req){
        return req.user ;
    }
}
