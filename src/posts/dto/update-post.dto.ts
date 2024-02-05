import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { ObjectId } from "mongoose";

export class UpdatePostDto {

    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly title?: string;

    @ApiProperty()    
    @IsOptional()
    @IsString()
    readonly content?: string;

    @ApiProperty({
        type: [String]
    })
    @IsOptional()
    @IsString()
    readonly categories?: string[];

    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly authorId?: ObjectId;
}