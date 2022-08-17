import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
@Module({
    imports : [] ,
    exports : [] , 
    controllers : [ProductController] ,
    providers : [ProductService , UsersService] ,
})
export class ProductModule{}
