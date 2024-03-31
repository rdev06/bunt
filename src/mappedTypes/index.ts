import { IsOptional } from 'class-validator';
import { GetShallowClass, type Type, inheritMetaValidators } from './utils';

export function PartialType<T>(classRef: Type<T>): Type<Partial<T>> {
  const shallow = GetShallowClass(classRef);

  shallow.keys.forEach((k: string) => {
    IsOptional()(shallow.class.prototype, k);
  });

  return shallow.class as Type<Partial<T>>;
}

export function PickType<T, K extends keyof T>(
  classRef: Type<T>,
  picks: readonly K[]
): Type<Pick<T, (typeof picks)[number]>> {
  abstract class PickTypeClass{};
  const toInherit = (key: string): boolean => {
    return picks.includes(key as K)
  }
  inheritMetaValidators(classRef, PickTypeClass, toInherit);
  return PickTypeClass as Type<Pick<T, (typeof picks)[number]>>;
}

export function OmitType<T, K extends keyof T>(
    classRef: Type<T>,
    omits: readonly K[]
  ): Type<Omit<T, (typeof omits)[number]>> {
    abstract class OmitTypeClass{};
    const toInherit = (key: string): boolean => {
        return !omits.includes(key as K)
      }
    inheritMetaValidators(classRef, OmitTypeClass, toInherit);
    return OmitTypeClass as Type<Omit<T, (typeof omits)[number]>>;
  }


export function IntersectionType<A, B>(
  classARef: Type<A>,
  classBRef: Type<B>
): Type<A & B> {
  abstract class IntersectionTypeClass extends (classARef as any){};
  const toInherit = () => true;
  inheritMetaValidators(classBRef, IntersectionTypeClass, toInherit);
  return IntersectionTypeClass as Type<A & B>;
}