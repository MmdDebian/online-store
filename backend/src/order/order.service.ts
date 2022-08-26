import { Injectable } from '@nestjs/common';
import { Order, PrismaClient, Product, User } from '@prisma/client';
import { createProductDto } from 'src/product/product-dto/createProductDto';
import { ProductService } from 'src/product/product.service';
import { UsersService } from 'src/users/users.service';
import { createOrderDto } from './order.dto';

const order = new PrismaClient().order ; 

@Injectable()
export class OrderService {
    constructor(
        private userService:UsersService , 
        private productService:ProductService
    ){}

    findAll():Promise<Order[]>{
        return order.findMany()
    }

    findOne(id:number):Promise<Order | null>{
        return order.findUnique({where : {id : id}})
    }

    findByProductId(id:number):Promise<Order | null>{
        return order.findFirst({where : { productId : id }});
    }

    async createOrder(product:Product , quantity:number , user:User):Promise<Order>{

        const foundOrder = await this.findByProductId(product.id);



        const newOrder:createOrderDto = {
            productId: product.id ,
            userId : user.id ,
            quantity : quantity ,
            total : product.price * quantity 
        };

        return order.create({data:newOrder});
    }
}
