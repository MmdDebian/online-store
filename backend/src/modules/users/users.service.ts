import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { hash , genSalt } from 'bcrypt';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';


@Injectable()
export class UsersService {

  constructor(private prisma:PrismaService){}
  
  private hashPassword(password:string):Promise<string | null>{
    return new Promise((resolve, reject) => {
      genSalt(12).then(salt=>{
        hash(password , salt).then(hash=>{
          return resolve(hash);
        })
      })
    })
  }

  async create(createUserDto:CreateUserDto) {
    createUserDto.password = await this.hashPassword(createUserDto.password);
    return this.prisma.user.create({
      data : {
        name : createUserDto.name , 
        email : createUserDto.email ,
        password : createUserDto.password
      }
    });
  }

  findAll():Promise<User[]> {
    return this.prisma.user.findMany({
      include : {
        orders : {
          include : {
            product : true
          }
        } ,
        comments : true 
      }
    })
  }

  findOne(id:string):Promise<User | null>{
    return this.prisma.user.findUnique({where : {id :id}})
  }

  findByEmail(email:string):Promise<User | null>{
    return this.prisma.user.findUnique({where : {email : email}});
  }

  update(id:string , updateUserDto:UpdateUserDto):Promise<User>{
    return this.prisma.user.update({where :{id : id} , data : updateUserDto})
  }

  remove(id:string):Promise<any>{
    return this.prisma.user.delete({where : {id : id}})
  }
}
