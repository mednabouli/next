import { ILogger } from "../abstractions";
export declare class NullLogger implements ILogger {
    error(message?: any, ...optionalParams: any[]): void;
    info(message?: any, ...optionalParams: any[]): void;
    log(message?: any, ...optionalParams: any[]): void;
}
