/// <reference types="bun-types" />
/// <reference types="bun-types" />
import 'reflect-metadata';
interface IBuntOption {
    routes: Record<string, Record<string, Function>>;
    port?: number;
    CORS_HEADERS?: Record<string, string>;
}
export default function bunt(option: IBuntOption): import("bun").Server;
export {};
