import { IsBoolean, IsInt, IsNotEmpty, IsNumber, Length, Max, Min} from "class-validator";


export class createProductDto {
    @IsNotEmpty()
    name : string ;
    @IsInt()
    price : number;
    @IsInt()
    discount : number ; 
    color : string;
    @IsNumber() 
    size : number;
    @IsBoolean()
    top : boolean ;
    @IsNotEmpty()
    description : string ;
}