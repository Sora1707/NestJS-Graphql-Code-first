import { Field, ObjectType } from "@nestjs/graphql";
import { CustomUuidScalar } from "src/scalars/UUID";

@ObjectType()
export class Event {
    @Field(type => CustomUuidScalar)
    id: string;

    @Field(type => Date)
    createdAt: Date;
}
