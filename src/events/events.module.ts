import { Module } from "@nestjs/common";
import { DateScalar } from "src/scalars/Date";
import { EventsResolver } from "./events.resolver";

@Module({
    providers: [DateScalar, EventsResolver],
})
export class EventsModule {}
