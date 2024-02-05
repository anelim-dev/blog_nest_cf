import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { HydratedDocument } from "mongoose";


export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    
    @ApiProperty({
        example: 'Yyengar',
        description: 'Name',
        required: true,
     })     
    @Prop({type: String, required: true})
    name: string;

    @ApiProperty({
        example: 'Dharma',
        description: 'Lastname',
        required: true,
     })     
    @Prop({type: String, required: true})
    lastname: string;

    @ApiProperty({
        example: 'dn@gmail.com',
        description: 'Email',
        required: true,
     })     
    @Prop({type: String, required: true})
    email: string;

    @ApiProperty({
        example: 'Yyengar',
        description: 'Password',
        required: true,
     })     
    @Prop({type: String, required: true})
    password: string;

    @ApiProperty({
        example: 'Yyengar',
        description: 'Password',
        required: true,
     })   
    @ApiProperty()
    @Prop({type: Boolean, required: true})
    isAdmin: boolean;

    @ApiProperty()
    @Prop({type:[String], required: true})
    rol: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);