import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { join } from "path";
import { UsersModule } from "./users/users.module";
import { EventsModule } from "./events/events.module";

@Module({
    imports: [
        UsersModule,
        EventsModule,
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), "src/schema.gql"),
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
