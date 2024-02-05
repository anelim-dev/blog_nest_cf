import { BadRequestException, Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types, isValidObjectId } from "mongoose";
import validator from "validator";



import { User } from "./schemas/users.schema";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";


@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>
    ) {}

    async findAllUsers(): Promise<User[]> {
        return this.userModel.find().lean();
    }

    async findUserById(id: string): Promise<User> {
        return this.userModel.findById(id).lean();
    }

    async findUserByEmail(userEmail: string): Promise<User> {
        return this.userModel.findOne( {email: userEmail} ).lean();
    }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        let { password, ...userData } = createUserDto;
        const saltRounds: number = 10; 
        try {
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const processedUser = { 
                    ...userData, 
                    password: hashedPassword
                };            
            const createdUser = new this.userModel(processedUser);
            return createdUser.save();            
        } catch (error) {
            console.log(error);
            throw new BadRequestException('Error creating user');
        }
    }

    async updateUser(
        id: string,
        updateUserDto: UpdateUserDto,
    ):Promise<User>{
        let { password, ...userData } = updateUserDto;
        const saltRounds: number = 10;        
        let processedUser = {};
        try {
            if (password && !validator.isEmpty(password)) {
                const hashedPassword = await bcrypt.hash(password, saltRounds);
                processedUser = {
                    ...userData,
                    password: hashedPassword
                };
            } else {
                processedUser = updateUserDto;
            }
            return this.userModel.updateOne({_id: id}, processedUser).lean();
                
        } catch (error) {
            console.log(error);
            throw new BadRequestException('Error updating user: ${error.message');
        }     
    }

    async removeUser(id: string): Promise<User> {
        try {
            return await this.userModel.findByIdAndDelete({_id: id}).lean();    
        } catch (error) {
            throw new BadRequestException('The user {id} could not be deleted');
        }
    }

    async userExistsById(id: string): Promise<boolean> { 
        try {           
            const validObject = await isValidObjectId(new Types.ObjectId(id));
            if (!validObject) {
                throw new BadRequestException(`Invalid ObjectId: ${id}`);
            }
            const user = await this.userModel.findById(id).lean();
             console.log(user, id);
             return user ? true : false;
        } catch (error) {
             console.log(error);
            throw new BadRequestException(`Error finding user by id: ${id}`);
        }           
    }
    
    async isUserAdmin(id: string): Promise<boolean>{
        const user = await this.userModel.findById({_id: id}).lean();
        console.log(user);
        if (user && user.isAdmin) {
            return true;
        }
        return false;
    }
}