import { getMetadataStorage } from 'class-validator';

export type Type<T = any> = new (...args: any[]) => T;


export function GetShallowClass<T>(classRef: Type<T>):{class: Type<T>, keys: Set<string>}{
    abstract class ShallowClass extends (classRef as any){};
    const validationMetas = getMetadataStorage().getTargetValidationMetadatas(
        ShallowClass,
        ShallowClass.name,
        true,
        false
      );
      const keys = new Set(validationMetas?.map((meta) => meta.propertyName));
    return {class: ShallowClass as Type<T>, keys}
}


export function inheritMetaValidators(fromRef: Type, toRef: Function, toInherit: (key: string) => boolean){
    const MetaStorage = getMetadataStorage();
    const validationMetas = MetaStorage.getTargetValidationMetadatas(
        fromRef,
        fromRef.name,
        true,
        false
      )
      validationMetas.forEach(meta => {
        if(toInherit(meta.propertyName)){
            MetaStorage.addValidationMetadata({...meta, target: toRef})
        }
    })
}
