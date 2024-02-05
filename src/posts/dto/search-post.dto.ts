import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsPositive, IsString, Min, ValidateIf } from "class-validator";


export class SearchPostDto {

    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly title?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly content?: string;  

    @ApiProperty({
        default:10, description: 'The number of items to return', required: false,
    })
    @IsOptional()
    @IsPositive()
    @Type(() => Number)
    limit?: number;

    @ApiProperty({
        default:0, description: 'The number of items to skip', required: false,
    })
    @IsOptional()    
    @IsNumber()
    @Min(0)
    @Type(() => Number)
    skip?: number;
    
}