import { Module, OnModuleInit } from "@nestjs/common";
import { UsersService } from "./users.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema, User } from "./mongo/schemas/user";
import { ArticleSchema, Article } from "./mongo/schemas/article";
import { ArticlesService } from "./articles.service";
import { UsersResolver } from "./users.resolver";
import { ArticlesResolver } from "./articles.resolver";

@Module({
    imports: [
        MongooseModule.forRoot("mongodb://127.0.0.1:27017/crud_dev}"),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        MongooseModule.forFeature([
            { name: Article.name, schema: ArticleSchema },
        ]),
    ],
    providers: [UsersService, ArticlesService, UsersResolver, ArticlesResolver],
    exports: [UsersService, ArticlesService],
})
export class UsersModule implements OnModuleInit {
    onModuleInit() {
        console.log("Finish loading Users Module");
    }
}
