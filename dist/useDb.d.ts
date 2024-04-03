import { MongoClient, Db, Collection, type Document } from 'mongodb';
export declare let client: MongoClient | null, db: Db | null;
export declare function connect(uri?: string, dbName?: string): Promise<MongoClient>;
export declare function Model<T extends Document = Document>(name: string, validator: object): Promise<Collection<T>>;
