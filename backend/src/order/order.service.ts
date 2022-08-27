import { Injectable } from '@nestjs/common';
import { Order, PrismaClient, Product, User } from '@prisma/client';
import { ProductService } from 'src/product/product.service';
import { UsersService } from 'src/users/users.service';
import { createOrderDto } from './order.dto';

@Injectable()
export class OrderService {
    constructor(
        private userService:UsersService , 
        private productService:ProductService , 
        private prisma:PrismaClient
    ){}

    findAll():Promise<Order[]>{
        return this.prisma.order.findMany()
    }

    findOne(id:number):Promise<Order | null>{
        return this.prisma.order.findUnique({where : {id : id}})
    }

    findByProductId(id:number):Promise<Order | null>{
        return this.prisma.order.findFirst({where : { productId : id }});
    }

    async createOrder(product:Product , quantity:number , user:User):Promise<Order>{

        const foundOrder = await this.findByProductId(product.id);

        if(foundOrder){
            return foundOrder ;
        }

        const newOrder:createOrderDto = {
            productId: product.id ,
            userId : user.id ,
            quantity : quantity ,
            total : product.price * quantity 
        };

        return this.prisma.order.create({data:newOrder});
    }

    async updateOrder(order:Order , data:createOrderDto):Promise<Order | null>{
        const foundOrder = await this.findOne(order.id);

        if(!order){
            return null ;
        }

        return 
        
    }
}
