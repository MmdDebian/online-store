import { IsNumber, Max, Min } from "class-validator";

export class UpdateOrderDto {
    @IsNumber()
    @Min(-0)
    @Max(10)
    readonly quantity: number ; 
}