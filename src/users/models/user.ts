import { Field, ObjectType } from "@nestjs/graphql";
import { Article } from "./article";
import { Role } from "src/global/roles.enum";

@ObjectType()
export class User {
    @Field(type => String, { nullable: false })
    id: string;

    @Field({ nullable: false })
    username: string;

    @Field({ nullable: false })
    password: string;

    @Field(type => [Role], { nullable: "itemsAndList" })
    roles: Role[];

    @Field(type => [Article], { nullable: "items" })
    articles: Article[];
}
