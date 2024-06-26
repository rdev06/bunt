import { type CreateIndexesOptions, type Document, type IndexSpecification, ObjectId } from 'mongodb';
import { ValidateBy, buildMessage, type ValidationOptions } from 'class-validator';
import Container from 'typedi';
import { Transform } from 'class-transformer';

export class HttpException extends Error {
  status: number;
  meta: any;
  constructor(message: string, status: number, meta?: any) {
    super(message);
    this.status = status;
    this.meta = meta;
  }
}

export class NotFoundException extends HttpException {
  constructor(message: string) {
    super(message, 404);
  }
}

export class Ctx {
  headers: Request['headers'];
  _headers: Record<string, string[]>;
  status: number;
  set: Function;
  [K: string]: any;
}

export function UseGuard(fns: Function | Function[]) {
  if (!Array.isArray(fns)) {
    fns = [fns];
  }
  return function (classRef: Function | any, propertyKey?: string, descriptor?: TypedPropertyDescriptor<any>): any {
    if (descriptor) {
      const original = descriptor.value;
      descriptor.value = async function (...args) {
        const ctx = Container.get(Ctx);
        for (const fn of fns) {
          await fn(ctx);
        }
        return original.apply(this, args);
      };
      return descriptor;
    }
    const methods = Object.getOwnPropertyNames(classRef.prototype);
    for (const method of methods) {
      if (method === 'constructor') continue;
      const original = classRef.prototype[method];
      classRef.prototype[method] = async function (...args: any[]) {
        const ctx = Container.get(Ctx);
        for (const fn of fns) {
          await fn(ctx);
        }
        return original.apply(this, args);
      };
    }
  };
}

export type IBsonType = 'object' | 'array' | 'string' | 'number' | 'boolean' | 'int' | 'long' | 'double' | 'decimal' | string;

export type IToGenerate = { name: string; schema: { bsonType: IBsonType; [k: string]: any } };

export const GeneralResponse: IToGenerate = {
  name: 'GeneralResponse',
  schema: {
    title: 'This is general Response Schema',
    bsonType: 'object',
    required: ['message'],
    properties: {
      message: {
        bsonType: 'string'
      },
      refId: {
        bsonType: 'string'
      }
    }
  }
};

export type IEntity = {
  name: string;
  default?: Record<string, any>;
  indexes?: { keys: IndexSpecification; option?: CreateIndexesOptions }[];
  schema: Document;
};

export const outputSchema: Record<string, IEntity> = { GeneralResponse };

export function mapEntity(entities: IEntity[]) {
  for (const enty of entities) {
    outputSchema[enty.name] = enty;
  }
}

export function ToMongoId(validationOptions?: ValidationOptions) {
  const name = 'ToMongoId';
  return function (object: Object, propertyName: string) {
    ValidateBy(
      {
        name,
        validator: {
          validate: (value: string | ObjectId) => ObjectId.isValid(value),
          defaultMessage: buildMessage((eachPrefix) => eachPrefix + '$property must be a mongodb id', validationOptions)
        }
      },
      validationOptions
    )(object, propertyName);
    return Transform(({ value }) => ObjectId.createFromHexString(value), { toClassOnly: true })(object, propertyName);
  };
}
