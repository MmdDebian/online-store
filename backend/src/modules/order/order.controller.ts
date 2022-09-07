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
    BadRequestException,
    Delete
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
    async findAll(@Req() req):Promise<Order[]>{
        return await this.orderService.findAll(req.user);
    }

    @Get(':id')
    async findOne(@Req() req ,  @Param('id') id:string):Promise<Order | HttpException>{
        const foundOrder = await this.orderService.findOne(req.user , id);

        if(!foundOrder){
            throw new NotFoundException('Order is not found')
        }

        return foundOrder
    }

    @Post(':id')
    async create(@Param('id') id:number , @Req() req , @Body() body:CreateOrderDto):Promise<Order | HttpException>{        
        const product = await this.productservice.findOne(id);

        if(!product){
            throw new NotFoundException('Product is not found');
        }

        const newOrder = await this.orderService.create(product , body.quantity , req.user);

        return newOrder ;
    }

    @Put(':id')
    async update(@Req() req , @Param('id') id:string , @Body() updateOrderDto:UpdateOrderDto):Promise<Order | HttpException>{
        const result = await this.orderService.update(id , req.user , updateOrderDto);

        if(!result){
            throw new BadRequestException('Order or product is invalid');
        }

        return result ;
    }

    @Delete(':id')
    async delete(@Param('id') id:string):Promise<HttpException>{
        return this.orderService.delete(id);
    }

}
