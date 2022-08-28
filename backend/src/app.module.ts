import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProfileController } from './profile/profile.controller';
import { ProfileService } from './profile/profile.service';
import { ProfileModule } from './profile/profile.module';
import { UsersService } from './users/users.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './auth/auth.middleware';
import { ProductController } from './product/product.controller';
import { ProductService } from './product/product.service';
import { ProductModule } from './product/product.module';
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';
import { OrderModule } from './order/order.module';
import { PrismaService } from './prisma/prisma.service';


@Module({
  imports: [UsersModule,ProfileModule, AuthModule, ProductModule, OrderModule],
  controllers: [AppController ,ProfileController, AuthController, ProductController, OrderController],
  providers: [PrismaService, AppService,UsersService,ProfileService, AuthService, ProductService, OrderService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path : 'profile' ,method :RequestMethod.ALL },
        { path : 'product', method: RequestMethod.POST},
        { path : 'product/*', method: RequestMethod.PUT},
        { path : 'users' , method : RequestMethod.ALL },
        { path : 'users/*' , method : RequestMethod.GET },
        { path : 'users/*' , method : RequestMethod.POST },
        { path : 'users/*' , method : RequestMethod.PUT },
        { path : 'order' , method : RequestMethod.ALL } ,
        { path : 'order/*' , method : RequestMethod.ALL } ,
      )
  }
}
