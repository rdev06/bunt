import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

export interface IOption {
  description?: string;
  type?: any
}

export const Modules: Record<string, Record<'query'|'mutation'|'subscription', Record<string, IOption & { input: any[] }>>> = {};

function serveType(q: 'query'|'mutation', option:IOption){
    return function(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<any>) {
        if(!Modules[target.constructor.name]) Modules[target.constructor.name] = {query:{}, mutation: {}, subscription: {}};
        Modules[target.constructor.name][q][propertyName] = {input: [], description: option.description, type: option.type}
        const parameterTypes: any[] = Reflect.getOwnMetadata('design:paramtypes', target, propertyName);
        for (const type of parameterTypes) {
          Modules[target.constructor.name][q][propertyName].input.push(type.name);
        }
        const method = descriptor.value!;
        descriptor.value = async function () {
          for (let i = 0; i < parameterTypes.length; i++) {
            const type = parameterTypes[i];
            if(typeof type === 'function' && type.prototype !== undefined){
              const init = plainToInstance(type, arguments[i]);
                const errors = await validate(init);
                if(errors.length > 0){
                    throw errors;
                }
            }
          }
          return method.apply(this, arguments);
        };
      }
}

export const query = (option: IOption) => serveType('query', option);
export const mutation = (option: IOption) => serveType('mutation', option);