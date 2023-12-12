import { Model } from "mongoose";
import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./mongo/schemas/user";
import { UserPostArgs } from "./dto/user-create.args";
import { UserUpdateArgs } from "./dto/user-update.args copy";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async findAll(): Promise<User[]> {
        return await this.userModel.find();
    }

    async findByUsername(username: string): Promise<User> {
        const result = await this.userModel.findOne({ username });
        return result;
    }

    async findById(id: string): Promise<User> {
        const result = await this.userModel.findById(id);
        return result;
    }

    async create(args: UserPostArgs) {
        const newUser = new this.userModel(args);
        return await newUser.save();
    }

    async deleteByUsername(username: string) {
        const deletedUser = await this.userModel.findOneAndDelete({ username });
        return deletedUser;
    }

    async updateUser(args: UserUpdateArgs) {
        const updatedUser = await this.userModel.findOneAndUpdate(
            { username: args.username },
            args,
        );
        return updatedUser;
    }
}
