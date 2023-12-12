import { Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { User } from "./models/user";
import { UsersService } from "./users.service";
import { ArticlesService } from "./articles.service";
import { Article } from "./models/article";
import { BaseResolver } from "src/BaseResolver";

@Resolver(of => Article) // Define the parent type
export class ArticlesResolver extends BaseResolver(Article) {
    constructor(
        private usersService: UsersService,
        private articlesService: ArticlesService,
    ) {
        super();
    }

    @Query(returns => Article, { name: "articles" })
    async getArticles() {
        return this.articlesService.findAll();
    }

    @ResolveField("author", returns => User)
    async author(@Parent() article: Article) {
        const { id } = article;
        return await this.usersService.findById(id);
    }
}
