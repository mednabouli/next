import { CommandBus, EventBus } from "@nestjs/cqrs";
import { MiddlewaresConsumer, OnModuleInit } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
export declare class SettingModule implements OnModuleInit {
    private readonly moduleRef;
    private readonly command;
    private readonly event;
    constructor(moduleRef: ModuleRef, command: CommandBus, event: EventBus);
    configure(consumer: MiddlewaresConsumer): void;
    onModuleInit(): void;
}
