import { MongoClient, ServerApiVersion, Db, Collection, type Document } from 'mongodb';

const collMap: Record<string, Collection<Document>> = {};
export let client: MongoClient | null = null,
  db: Db | null = null;

export async function connect(uri = process.env.MONGO_URI || 'mongodb://localhost:27017', dbName = process.env.MONGO_DB || 'bunt') {
  client = new MongoClient(uri, {
    serverApi:{
      version: ServerApiVersion.v1,
      strict: true
    }
  });
  await client.connect();
  console.log('db connected');
  // client.topology.isConnected();
  db = client.db(dbName);
  const collections = await db.listCollections({type: 'collection'}, { nameOnly: true }).toArray();
  // console.dir(collections);
  for (const col of collections) {
    // if (col.type === 'collection') {
      collMap[col.name] = db.collection(col.name);
    // }
  }
  return client;
}

export async function Model<T extends Document = Document>(name: string, validator: object): Promise<Collection<T>> {
  if (!db) throw new Error('Either client not connected or Database not found');
  if (!collMap[name]) {
    collMap[name] = await db.createCollection(name, { validator });
  }
  return collMap[name] as unknown as Collection<T>;
}



