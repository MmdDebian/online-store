import { Controller, Get, Req } from '@nestjs/common';

@Controller('profile')
export class ProfileController {
    constructor(){

    }

    @Get('')
    async index(@Req() req){
        return req.user ;
    }
}
