import { 
    Body, 
    Controller , 
    Req , 
    Get, 
    HttpException,
    NotFoundException, 
    Param, 
    Post, 
    Put,
    BadRequestException
} from '@nestjs/common';
import { Order } from '@prisma/client';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderService } from './order.service';
import { ProductService } from 'src/modules/product/product.service'
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('order')
export class OrderController {
    constructor(
        private orderService:OrderService ,
        private productservice:ProductService 
    ){}

    @Get('')
    async findAll():Promise<Order[]>{
        return await this.orderService.findAll()
    }

    @Get(':id')
    async findOne(@Param('id') id:number):Promise<Order | HttpException>{
        const foundOrder = await this.orderService.findOne(id);

        if(!foundOrder){
            return new NotFoundException('Order is not found')
        }
    }

    @Post(':id')
    async create(@Param('id') id:number , @Req() req , @Body() body:CreateOrderDto):Promise<Order | HttpException>{        
        const product = await this.productservice.findOne(id);

        if(!product){
            return new NotFoundException('Product is not found');
        }

        const newOrder = await this.orderService.create(product , body.quantity , req.user);

        return newOrder ;
    }

    @Put(':id')
    async update(@Req() req , @Param() id:number , @Body() updateOrderDto:UpdateOrderDto):Promise<Order | HttpException>{
        const result = await this.orderService.update(id , req.user , updateOrderDto);

        if(!result){
            return new BadRequestException('Order or product is invalid');
        }

        return result ;
    }

}
