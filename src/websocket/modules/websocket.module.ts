import { EventGateway } from "../gateways";
import { Module } from "@nestjs/common";
import { MiddlewaresConsumer } from "@nestjs/common";

@Module({
    components: [
        EventGateway,
    ],
})
export class WebsocketModule {
    configure(consumer: MiddlewaresConsumer) {
    }
}
