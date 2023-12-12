import {
    Args,
    Int,
    Mutation,
    Parent,
    Query,
    ResolveField,
    Resolver,
    registerEnumType,
} from "@nestjs/graphql";
import { User } from "./models/user";
import { UsersService } from "./users.service";
import { ArticlesService } from "./articles.service";
import { Article } from "./models/article";
import { UserLoginArgs } from "./dto/user-login.args";
import { BaseResolver } from "src/BaseResolver";
import { Role } from "src/global/roles.enum";
import { UserPostArgs } from "./dto/user-create.args";
import { GraphQLError } from "graphql";
import { BadRequestException } from "@nestjs/common";
import { UserUpdateArgs } from "./dto/user-update.args copy";

registerEnumType(Role, { name: "Role" });

@Resolver(of => User) // Define the parent type
export class UsersResolver extends BaseResolver(User) {
    constructor(
        private usersService: UsersService,
        private articlesService: ArticlesService,
    ) {
        super();
    }

    @Query(returns => [User], { name: "users" })
    async getUsers() {
        return await this.usersService.findAll();
    }

    @Query(returns => User, { name: "user" })
    async getUser(
        @Args("username", {
            type: () => String,
            nullable: false,
            defaultValue: "Sora",
        })
        username: string,
    ) {
        const user = await this.usersService.findByUsername(username);
        return user;
    }

    @Mutation(returns => User)
    async createUser(@Args() args: UserPostArgs) {
        const temp = await this.usersService.findByUsername(args.username);
        if (temp)
            throw new BadRequestException(
                `User ${args.username} has already existed`,
            );
        if (!args.roles.includes(Role.User)) args.roles.push(Role.User);
        const newUser = await this.usersService.create(args);
        return newUser;
    }

    @Mutation(returns => User)
    async deleteByUsername(
        @Args("username", {
            type: () => String,
            nullable: false,
        })
        username: string,
    ) {
        const deletedUser = await this.usersService.deleteByUsername(username);
        console.log(deletedUser);
        if (!deletedUser)
            throw new BadRequestException(`Cannot find user ${username}`);
        return deletedUser;
    }

    @Mutation(returns => User)
    async updateUser(@Args() args: UserUpdateArgs) {
        const user = await this.usersService.updateUser(args);
        if (!user)
            throw new BadRequestException(`Cannot find user ${args.username}`);
        return user;
    }

    @Query(returns => Boolean, { name: "login" })
    async login(@Args() args: UserLoginArgs) {
        console.log(args);
        return true;
    }

    @ResolveField("articles", returns => [Article])
    async articles(@Parent() user: User) {
        const { id } = user;
        return await this.articlesService.findByAuthorId(id);
    }
}
