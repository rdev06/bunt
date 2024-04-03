/// <reference types="node" />
export declare const GeneralResponse: {
    title: string;
    bsonType: string;
    required: string[];
    properties: {
        message: {
            bsonType: string;
        };
        refId: {
            bsonType: string;
        };
    };
};
export declare function UseGuard(fn: Function): (classRef: Function) => void;
export declare class HttpException extends Error {
    status: number;
    meta: any;
    constructor(message: string, status: number, meta?: any);
}
export declare class NotFoundException extends HttpException {
    constructor(message: string);
}
export type Ctx = {
    headers: Request['headers'];
    _headers: Record<string, string>;
    status: number;
    set: Function;
};
