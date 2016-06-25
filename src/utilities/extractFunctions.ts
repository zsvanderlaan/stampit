import isObject from './isObject';
import isFunction from './isFunction';
import slice from './slice';
import values from './values';

export interface Initializer {
  (): any;
}

export function isInitializer(target: any | Initializer): target is Initializer {
  return isFunction((target as Initializer));
}

export interface InitializerArray {
  [index: number]: Initializer;
  length: number;
  filter(callbackfn: (value: Initializer, index: number, array: InitializerArray) => boolean, thisArg?: any): InitializerArray;
  reduce(callbackfn: (previousValue: Initializer, currentValue: Initializer, currentIndex: number, array: InitializerArray) => Initializer, initialValue?: Initializer): Initializer;
}

export function isInitializerArray(target: any | InitializerArray): target is InitializerArray {
  return (
    (undefined !== (target as InitializerArray).length)
    && (0 !== (target as InitializerArray).length)
  );
}

export type InitializerDescriptorProperty = Initializer | InitializerArray;

export function extractFunctions(...args: Array<InitializerDescriptorProperty>): InitializerArray {
    const functions = slice.call(args).reduce((result, arg) => {
        if (isInitializer(arg)) {
            return result.concat(arg);
        }
        if (isInitializerArray(arg)) {
            return result.concat(extractFunctions.apply(null, arg) || []);
        }
        if (isObject(arg)) {
            return result.concat(extractFunctions.apply(null, values(arg)) || []);
        }
        return result;
    }, []);
    return functions.length === 0 ? undefined : functions;
}
