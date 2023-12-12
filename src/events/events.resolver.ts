import { Query, Resolver } from "@nestjs/graphql";
import { Event } from "./event.model";

@Resolver(returns => Event)
export class EventsResolver {
    @Query(returns => Event, { name: "event" })
    getExampleEvent() {
        return {
            id: "654f57128f643c82a937fa53",
            createdAt: new Date(),
        };
    }
}
