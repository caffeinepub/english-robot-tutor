import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ConversationTurn {
    user: string;
    correction?: string;
    robot: string;
}
export interface backendInterface {
    getConversationLog(): Promise<Array<ConversationTurn>>;
    processInput(userInput: string): Promise<string>;
}
