export interface IOption {
    description?: string;
    type?: any;
}
export declare const Modules: Record<string, Record<'query' | 'mutation' | 'subscription', Record<string, IOption & {
    input: any[];
}>>>;
export declare const query: (option: IOption) => (target: any, propertyName: string, descriptor: TypedPropertyDescriptor<any>) => void;
export declare const mutation: (option: IOption) => (target: any, propertyName: string, descriptor: TypedPropertyDescriptor<any>) => void;
