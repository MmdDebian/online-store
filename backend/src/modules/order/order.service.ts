import { Injectable } from '@nestjs/common';
import { Order, User , Product } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { ProductService } from 'src/modules/product/product.service';
import { UpdateOrderDto } from './dto/update-order.dto';
import { IOrder } from './order.interface';

@Injectable()
export class OrderService {
    constructor(
        private productService:ProductService , 
        private prisma:PrismaService
    ){}

    findAll(user:User):Promise<Order[]>{
        return this.prisma.order.findMany({
            where : {
                userId : user.id ,
            } ,
            include : {
                product : true
            }
        })
    }

    findOne(user:User , id:string):Promise<Order | null>{
        return this.prisma.order.findFirst({
            where : {
                id : id ,
                userId : user.id 
            },
            include : {
                product : true
            }
        })
    }

    private findByProductId(id:number , user:User):Promise<Order | null>{
        return this.prisma.order.findFirst({
            where : { productId : Number(id) , user:user} , 
        });
    }

    async create(product:Product , quantity:number , user:User):Promise<Order>{

        const foundOrder = await this.findByProductId(product.id , user);

        if(foundOrder){
            const updateProduct = await this.prisma.order.update({
                where : { id : foundOrder.id },
                data : { 
                    quantity : quantity ,
                    total : quantity * product.price
                },
            })
            return updateProduct ;
        }

        const newOrder:IOrder = {
            productId: product.id ,
            userId : user.id ,
            quantity : quantity ,
            total : product.price * quantity 
        };

        return this.prisma.order.create({data:newOrder});
    }

    async update(id:string , user:User ,updateOrderDto:UpdateOrderDto):Promise<Order | null>{
        const foundOrder = await this.findOne(user,id);
        const foundProduct = await this.productService.findOne(foundOrder.productId);

        if(!foundProduct){
            return null ;
        }

        if(!foundOrder){
            return null ;
        }

        const data:IOrder = { 
            productId : foundProduct.id ,
            quantity : updateOrderDto.quantity ,
            userId : user.id ,
            total : foundProduct.price * updateOrderDto.quantity 
        } 

        return this.prisma.order.update({where : {id : foundOrder.id} , data:data});
    }

    async delete(id:string):Promise<any>{
        return this.prisma.order.delete({where : {id : id}})
    }
}
