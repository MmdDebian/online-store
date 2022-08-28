import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { UsersService } from 'src/modules/users/users.service';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
@Module({
    imports : [] ,
    exports : [] , 
    controllers : [ProductController] ,
    providers : [PrismaService ,ProductService , UsersService] ,
})
export class ProductModule{}
