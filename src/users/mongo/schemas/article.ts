import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { HydratedDocument, Document } from "mongoose";

@Schema()
export class Article extends Document {
    @Prop({ required: true })
    authorId: mongoose.Types.ObjectId;

    @Prop({ default: "Hello Sora" })
    content: string;
}

export type ArticleDocument = HydratedDocument<Article>;

export const ArticleSchema = SchemaFactory.createForClass(Article);
