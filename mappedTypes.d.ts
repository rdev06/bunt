export type Type<T = any> = new (...args: any[]) => T;
export declare function GetShallowClass<T>(classRef: Type<T>): {
    class: Type<T>;
    keys: Set<string>;
};
export declare function inheritMetaValidators(fromRef: Type, toRef: Function, toInherit: (key: string) => boolean): void;
export declare function PartialType<T>(classRef: Type<T>): Type<Partial<T>>;
export declare function PickType<T, K extends keyof T>(classRef: Type<T>, picks: readonly K[]): Type<Pick<T, (typeof picks)[number]>>;
export declare function OmitType<T, K extends keyof T>(classRef: Type<T>, omits: readonly K[]): Type<Omit<T, (typeof omits)[number]>>;
export declare function IntersectionType<A, B>(classARef: Type<A>, classBRef: Type<B>): Type<A & B>;
