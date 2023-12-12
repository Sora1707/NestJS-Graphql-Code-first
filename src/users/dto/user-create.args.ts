import { ArgsType, Field } from "@nestjs/graphql";
import { Role } from "src/global/roles.enum";

@ArgsType()
export class UserPostArgs {
    @Field({ nullable: false })
    username: string;

    @Field({ nullable: false })
    password: string;

    @Field(type => [Role], { nullable: true, defaultValue: [Role.User] })
    roles: Role[];
}
