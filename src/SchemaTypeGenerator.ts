import { GeneralResponse } from './common';

const TypeBsonMap = {
  string: 'string',
  bool: 'boolean',
  objectId: 'string',
  int: 'number',
  double: 'number'
};

export function Generate(schema: any) {
  let Gen = '';
  if (schema.bsonType === 'object') {
    for (const key in schema.properties) {
      if (key === '_id') continue;
      // @ts-ignore
      let type = TypeBsonMap[schema.properties[key].bsonType];
      if (type === 'object') {
        type = Generate(schema.properties[key]);
      }

      Gen += ` ${key}${!schema.required.includes(key) ? '?' : ''} : ${type}, \n`;
    }
  }
  return '{ \n' + Gen + '}';
}

type IBsonType = 'object' | 'array' | 'string' | 'number' | 'boolean' | string;

type IToGenerate = { name: string; schema: { bsonType: IBsonType; [k: string]: any } };

export function SchemaTypeGenerator(toGenerate: IToGenerate[], fileLocation?: string): string | Promise<number> {
  // @ts-ignore
  const schemas: IToGenerate[] = [{ name: 'GeneralResponse', schema: GeneralResponse }].concat(toGenerate);

  const Types = schemas.map((e: IToGenerate) => `export interface I${e.name} ${Generate(e.schema)}`);

  const toWrite = `
//***** This is auto generated types ***//
import { ObjectId } from 'mongodb';

${Types.join('\n')}
// *** Please do not touch unless you know what you are doing ***//
`;
  if (fileLocation) {
    return Bun.write(fileLocation, toWrite);
  }
  return toWrite;
}
