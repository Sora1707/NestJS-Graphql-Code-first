import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { UsersService } from "./users/users.service";
import { ArticlesService } from "./users/articles.service";

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        private usersService: UsersService,
        private articlesService: ArticlesService,
    ) {}

    @Get()
    async getHello() {
        console.log(await this.usersService.findByUsername("Sora"));
        console.log(
            await this.articlesService.findByAuthorId(
                "654f57128f643c82a937fa53",
            ),
        );
        return this.appService.getHello();
    }
}
