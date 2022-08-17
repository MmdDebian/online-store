import { Injectable } from '@nestjs/common';
import { PrismaClient , User } from '@prisma/client';
import { CreateUserDto } from './user-dto/createUserDto';
import * as bcrypt from 'bcrypt';

const user = new PrismaClient().user ;

@Injectable()
export class UsersService {
  
  private hashPassword(password:string):Promise<string | null>{
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(12).then(salt=>{
        bcrypt.hash(password , salt).then(hash=>{
          return resolve(hash);
        })
      })
    })
  }

  async create(createUserDto:CreateUserDto) {
    createUserDto.password = await this.hashPassword(createUserDto.password);
    return user.create({data : createUserDto});
  }

  findAll():Promise<User[]> {
    return user.findMany({})
  }

  findOne(id):Promise<User | null>{
    return user.findUnique({where : {id :id}})
  }

  findByEmail(email:string):Promise<User | null>{
    return user.findUnique({where : {email : email}});
  }

  update(id, updateUserDto):Promise<User>{
    return user.update({where :{id : id} , data : updateUserDto})
  }

  remove(id):Promise<any>{
    return user.delete({where : {id : id}})
  }
}
