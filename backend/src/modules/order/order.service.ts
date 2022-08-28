import { Injectable } from '@nestjs/common';
import { Order, User , Product } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { ProductService } from 'src/modules/product/product.service';
import { UsersService } from 'src/modules/users/users.service';
import { UpdateOrderDto } from './dto/update-order.dto';
import { IOrder } from './order.interface';

@Injectable()
export class OrderService {
    constructor(
        private userService:UsersService , 
        private productService:ProductService , 
        private prisma:PrismaService
    ){}

    findAll():Promise<Order[]>{
        return this.prisma.order.findMany()
    }

    findOne(id:number):Promise<Order | null>{
        return this.prisma.order.findUnique({where : {id : id}})
    }

    findByProductId(id:number):Promise<Order | null>{
        return this.prisma.order.findFirst({where : { productId : id}});
    }

    async create(product:Product , quantity:number , user:User):Promise<Order>{

        const foundOrder = await this.findByProductId(product.id);

        if(foundOrder){
            return foundOrder ;
        }

        const newOrder:IOrder = {
            productId: product.id ,
            userId : user.id ,
            quantity : quantity ,
            total : product.price * quantity 
        };

        return this.prisma.order.create({data:newOrder});
    }

    async update(id:number , user:User ,updateOrderDto:UpdateOrderDto):Promise<Order | null>{
        const foundOrder = await this.findOne(id);
        const foundProduct = await this.productService.findOne(foundOrder.productId);

        if(!foundOrder){
            return null ;
        }
        if(!foundProduct){
            return null ;
        }

        const data:IOrder = { 
            productId : foundOrder.id ,
            quantity : updateOrderDto.quantity ,
            userId : user.id ,
            total : foundProduct.price * updateOrderDto.quantity 
        } 

        return this.prisma.order.update({where : foundOrder , data:data});
    }
}
