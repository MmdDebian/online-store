import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductService } from 'src/product/product.service';
import { UsersService } from 'src/users/users.service';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
    imports : [] , 
    controllers : [OrderController] , 
    providers : [OrderService,ProductService ,PrismaService , UsersService]
})
export class OrderModule {}
