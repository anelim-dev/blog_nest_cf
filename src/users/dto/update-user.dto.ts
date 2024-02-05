import { Type } from "class-transformer";
import { IsBoolean, IsOptional, IsString } from "class-validator";

export class UpdateUserDto {

    @IsOptional()
    @IsString()
    readonly name?: string;
    
    @IsOptional()
    @IsString()    
    readonly lastname?: string;
    
    @IsOptional()
    @IsString()
    readonly email?: string;
    
    @IsOptional()
    @IsString()
    readonly password?: string;

    @IsOptional()
    @IsBoolean()
    readonly isAdmin?: boolean;
   
    @IsOptional()
    @IsString({each: true})
    readonly rol?: string[];
}
