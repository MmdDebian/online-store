import { Controller, Get, Post, Body,  Param, Delete, HttpException, HttpStatus, Put, UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/authorizetion/admin.guard';
import { CreateUserDto } from './user-dto/createUserDto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  @UseGuards(AdminGuard)
  @Post()
  async create(@Body() createUserDto:CreateUserDto) {

    const user = await this.usersService.findByEmail(createUserDto.email);

    
    if(user){
      throw new HttpException('email or password not valid' , HttpStatus.CONFLICT)
    }

    const result = await this.usersService.create(createUserDto);

    if(!result){
      throw new HttpException('internet server error(test)' , HttpStatus.INTERNAL_SERVER_ERROR)
    }

    return result ;
  }

  @UseGuards(AdminGuard)
  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @UseGuards(AdminGuard)
  @Get(':id')
  async findOne(@Param('id') id: number) {
    console.log(id)
    const result = await this.usersService.findOne(id);

    if(!result){
      throw new HttpException('not found user' , HttpStatus.NOT_FOUND);
    }

    return result ;
  }

  @UseGuards(AdminGuard)
  @Put(':id')
  async update(@Param('id') id:number, @Body() updateUserDto) {
    const foundUser = await this.usersService.findOne(id);

    if(!foundUser){
      throw new HttpException('user is not found for update' , HttpStatus.NOT_FOUND);
    }

    return await this.usersService.update(id , updateUserDto);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }
}
