import {merge, assign} from './merge';
import isFunction from '../utilities/isFunction';
import {BaseDescriptor} from '../descriptor/baseDescriptor';
import {Composer, isComposer} from "./compose";
import {isInitializerArray, InitializerArray} from "../utilities/extractFunctions";

export interface FactoryBase {
  (options: any, ...args: Array<any>): any;
}

export interface Factory extends FactoryBase, Composer { }

export function isFactory(target: any | Factory): target is Factory {
  return isComposer(target);
}

/**
 * Creates new factory instance.
 * @param {object} descriptor The information about the object the factory will be creating.
 * @returns {Function} The new factory function.
 */
export function createFactory(descriptor: BaseDescriptor): Factory | FactoryBase {
    return function Stamp(options: any = {}, ...args: Array<any>): any {
        const obj = Object.create(descriptor.methods || {});

        merge(obj, descriptor.deepProperties);
        assign(obj, descriptor.properties);
        Object.defineProperties(obj, descriptor.propertyDescriptors || {});

        // todo: this will need a type check for isInitializerArray
        if (!!descriptor.initializers && isInitializerArray(descriptor.initializers)) {
          return (descriptor.initializers as InitializerArray).filter(isFunction).reduce((resultingObj, initializer) => {
            const returnedValue = initializer.call(resultingObj, options,
              {instance: resultingObj, stamp: Stamp, args: [options].concat(args)});
            return returnedValue === undefined ? resultingObj : returnedValue;
          }, obj);
        }
        else {
          return obj;
        }
    };
}
