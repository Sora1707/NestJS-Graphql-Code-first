import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
export class UserLoginArgs {
    @Field({ nullable: true })
    username: string;

    @Field({ nullable: true })
    password: string;
}
