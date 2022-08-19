import { IsBoolean, IsNotEmpty, isNotEmpty, IsNumber, IS_EMAIL } from "class-validator";


export class createProductDto {
    @IsNotEmpty()
    name : string ;
    @IsNumber()
    price : number;
    @IsNumber()
    discount : number ; 
    color : string;
    @IsNumber() 
    size : number;
    @IsBoolean()
    top : boolean ;
    @IsNotEmpty()
    description : string ;
}