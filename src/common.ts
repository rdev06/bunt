export * from './mappedTypes';
export const GeneralResponse = {
  title: 'This is general Response Schema',
  bsonType: 'object',
  required: ['message'],
  properties: {
    message: {
      bsonType: 'string'
    },
    refId: {
      bsontype: 'string'
    }
  }
};

export function UseGuard(fn: Function) {
  return function (classRef: Function) {
    const methods = Object.getOwnPropertyNames(classRef.prototype);
    for (const method of methods) {
      if (method === 'constructor') continue;
      const original = classRef.prototype[method];
      classRef.prototype[method] = async function (...args: any[]) {
        await fn.call(this);
        return original.apply(this, args);
      };
    }
  };
}

export class HttpException extends Error {
  status: number;
  meta: any;
  constructor(message: string, status: number, meta?: any){
    super(message);
    this.status = status;
    this.meta = meta;
  }
}

export class NotFoundException extends HttpException {
  constructor(message: string){
    super(message, 404);
  }
}


export type Ctx = {
  headers: Request['headers'];
  _headers: Record<string, string>;
  status: number;
  set: Function;
};
