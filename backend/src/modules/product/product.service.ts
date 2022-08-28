import { Injectable } from '@nestjs/common';
import { PrismaClient, Product } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { UsersService } from 'src/modules/users/users.service';
import { createProductDto } from './dto/createProductDto';

@Injectable()
export class ProductService {
    constructor(
        private userService:UsersService ,
        private prisma:PrismaService 
    ){}

    findAll():Promise<Product[]>{
        return this.prisma.product.findMany({})
    }

    findOne(id:number):Promise<Product | null>{
        return this.prisma.product.findUnique({where : {id : Number(id)}});
    }

    findByName(name:string):Promise<Product | null>{
        return this.prisma.product.findFirst({where : {name : name}});
    }

    create(body:createProductDto):Promise<Product>{
        return this.prisma.product.create({data:body});
    }

    update(product:Product , data:createProductDto):Promise<Product | null>{
        return this.prisma.product.update({where : {id : Number(product.id)} , data : data})
    }

    delete(product:Product):Promise<any>{
        return this.prisma.product.delete({where : {id : Number(product.id)}});
    }

}
