import { Injectable } from '@nestjs/common';
import { PrismaClient , User } from '@prisma/client';
import { CreateUserDto } from './user-dto/createUserDto';


const user = new PrismaClient().user ;

@Injectable()
export class UsersService {
  create(createUserDto:CreateUserDto) {
    return user.create({data : createUserDto});
  }

  findAll():Promise<User[]> {
    return user.findMany({})
  }

  findOne(id):Promise<User | null>{
    return user.findUnique({where : {id : parseInt(id)}})
  }

  findByEmail(email:string):Promise<User | null>{
    return user.findUnique({where : {email : email}});
  }

  update(id, updateUserDto):Promise<User>{
    return user.update({where :{id :parseInt(id)} , data : updateUserDto})
  }

  remove(id):Promise<any>{
    return user.delete({where : {id : parseInt(id)}})
  }
}
