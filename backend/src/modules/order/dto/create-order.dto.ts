import { IsNumber, Max, Min } from "class-validator";

export class CreateOrderDto {
    @IsNumber()
    @Min(0)
    @Max(10)
    quantity : number ;
}