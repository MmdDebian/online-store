import { Body, Controller, Get, HttpException, HttpStatus, NotFoundException, Param, Post, Put, Req } from '@nestjs/common';
import { Product } from '@prisma/client';
import { createProductDto } from './product-dto/createProductDto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(
        private productService:ProductService
    ){}

    @Get()
    async findAll():Promise<Product[]>{
        return await this.productService.findAll()
    }

    @Get(':id')
    async finOne(@Param('id') id:string):Promise<Product | HttpException>{
        const product = await this.productService.findOne(id);

        if(!product){
            throw new HttpException('product is not found' , HttpStatus.NOT_FOUND);
        }

        return product ;
    }

    @Post()
    async create(@Body() body:createProductDto):Promise<Product | HttpException>{
        const result = await this.productService.create(body);
        throw new HttpException({message:"successfully created" , data:result} , HttpStatus.CREATED); 
    }

    @Put(':id')
    async update(@Param('id') id , @Body() body:createProductDto):Promise<Product | HttpException>{
        
        const product = await this.productService.findOne(id);

        if(!product){
            throw new HttpException('product is not found' , HttpStatus.NOT_FOUND);
        }

        const result = await this.productService.update(product , body);

        return result ; 
    }
}
