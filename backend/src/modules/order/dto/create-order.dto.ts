import { IsNotEmpty, IsNumber, Max, Min } from "class-validator";

export class CreateOrderDto {
    @IsNotEmpty()
    @IsNumber()
    @Min(-0)
    @Max(10)
    quantity : number ;
}