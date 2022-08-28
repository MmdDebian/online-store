import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { ProfileController } from './modules/profile/profile.controller';
import { ProfileService } from './modules/profile/profile.service';
import { ProfileModule } from './modules/profile/profile.module';
import { UsersService } from './modules/users/users.service';
import { AuthController } from './modules/auth/auth.controller';
import { AuthService } from './modules/auth/auth.service';
import { AuthModule } from './modules/auth/auth.module';
import { AuthMiddleware } from './modules/auth/auth.middleware';
import { ProductController } from './modules/product/product.controller';
import { ProductService } from './modules/product/product.service';
import { ProductModule } from './modules/product/product.module';
import { OrderController } from './modules/order/order.controller';
import { OrderService } from './modules/order/order.service';
import { OrderModule } from './modules/order/order.module';
import { PrismaService } from './modules/prisma/prisma.service';


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
