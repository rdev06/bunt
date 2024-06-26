import  { type IToGenerate, GeneralResponse } from './common';

const TypeBsonMap = {
  objectId: 'ObjectId',
  string: 'string',
  bool: 'boolean',
  int: 'number',
  long: 'number',
  decimal: 'number',
  number: 'number',
  double: 'number'
};
const space = '  ';
const tab = (ind: number): string => Array(ind).fill(space).join('');

export function Generate(schema: any, idx=0) {
  const ind = tab(idx);
  const isFound = TypeBsonMap[schema.bsonType];
  if(isFound) return isFound;
  let Gen = '';
  if (schema.bsonType === 'object') {
    for (const key in schema.properties) {
      if (key === '_id') continue;
      const bsonType = schema.properties[key].bsonType;
      let type;
      if (bsonType === 'object') {
        type = Generate(schema.properties[key], idx+1);
      }else if(bsonType === 'array'){
        type = Generate(schema.properties[key].items, idx+1) + '[]';
      }else{
        type = TypeBsonMap[bsonType];
        if(type === TypeBsonMap['string'] && schema.properties[key].enum){
          type = schema.properties[key].enum.map(e => `'${e}'`).join(' | ');
        }
      }
      Gen += `${space + ind + key}${!schema.required.includes(key) ? '?' : ''}: ${type};\n`;
    }
    if(!schema.hasOwnProperty('additionalProperties') || schema.additionalProperties){
      Gen += space + ind + '[K: string]: any;\n';
    }
  }
  return '{\n' + Gen + ind + '}';
}


export function SchemaTypeGenerator(toGenerate: IToGenerate[], fileLocation?: string): string | Promise<number> {
  const schemas: IToGenerate[] = [GeneralResponse, ...toGenerate];
  const Types = schemas.map((e: IToGenerate) => `export interface I${e.name} ${Generate(e.schema)}`);
  const toWrite = `//***** This is auto generated types ***//
import type { ObjectId } from 'mongodb';

${Types.join('\n')}
// *** Please do not touch unless you know what you are doing ***//
`;
  if (fileLocation) {
    return Bun.write(fileLocation, toWrite);
  }
  return toWrite;
}
