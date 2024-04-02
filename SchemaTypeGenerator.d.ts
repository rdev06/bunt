export declare function Generate(schema: any): string;
type IBsonType = 'object' | 'array' | 'string' | 'number' | 'boolean' | string;
type IToGenerate = {
    name: string;
    schema: {
        bsonType: IBsonType;
        [k: string]: any;
    };
};
export declare function SchemaTypeGenerator(toGenerate: IToGenerate[], fileLocation?: string): string | Promise<number>;
export {};
