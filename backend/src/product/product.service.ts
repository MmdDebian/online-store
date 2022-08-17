import { Injectable } from '@nestjs/common';
import { PrismaClient, Product } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
import { createProductDto } from './product-dto/createProductDto';
const Product = new PrismaClient().product ;

@Injectable()
export class ProductService {
    constructor(private userService:UsersService){}

    findAll():Promise<Product[]>{
        return Product.findMany({})
    }

    findOne(id:number):Promise<Product | null>{
        return Product.findUnique({where : {id:id}});
    }

    findByName(name:string):Promise<Product | null>{
        return Product.findFirst({where : {name : name}});
    }

    create(body:createProductDto):Promise<Product>{
        return Product.create({data:body});
    }

    update(product:Product , data:createProductDto):Promise<Product | null>{
        return Product.update({where : {id : product.id} , data : data})
    }

    delete(product:Product):Promise<any>{
        return Product.delete({where : {id : product.id}});
    }

}
