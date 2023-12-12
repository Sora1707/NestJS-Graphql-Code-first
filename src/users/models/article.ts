import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "./user";

@ObjectType()
export class Article {
    @Field(type => String)
    id: string;

    @Field()
    content: string;

    @Field(type => User)
    author: User;
}
