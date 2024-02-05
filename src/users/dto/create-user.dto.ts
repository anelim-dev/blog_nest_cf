import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    
    @ApiProperty({
        example: 'Yyengar',
        description: 'Name',
        required: true,
     })     
    @IsString()
    @IsNotEmpty()
    readonly name: string;
    
    @ApiProperty({
        example: 'Dharma',
        description: 'Lastname',
        required: true,
     })         
    @IsString()
    @IsNotEmpty()
    readonly lastname: string;

    @ApiProperty({
        example: 'dn@gmail.com',
        description: 'Email',
        required: true,
     })     
    @IsString()
    @IsEmail()
    readonly email: string;

    @ApiProperty({
        example: 'hashedPassword',
        description: 'Password',
        required: true,
     })
    @IsString()
    @IsNotEmpty()
    readonly password: string;


    @ApiProperty({
        example: 'true',
        description: 'Indicates if the user is an admin or not.',
        required: true,
    })      
    @IsBoolean()
    @IsNotEmpty()
    readonly isAdmin: boolean;

    @ApiProperty({
        example: 'Admin, User, Guest',
        description: 'Indicates the role of the user.',
        required: true,
    })      
    @IsString({each: true})
    @IsNotEmpty()
    readonly rol: string[];
}
