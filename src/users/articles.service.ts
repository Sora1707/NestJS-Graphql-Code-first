import { Injectable } from "@nestjs/common";
import { Article } from "./mongo/schemas/article";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Injectable()
export class ArticlesService {
    constructor(
        @InjectModel(Article.name) private articleModel: Model<Article>,
    ) {}

    async findAll(): Promise<Article[]> {
        return await this.articleModel.find();
    }
    async findByAuthorId(authorId: string) {
        return await this.articleModel.find({
            authorId: new mongoose.Types.ObjectId(authorId),
        });
    }
}
