import {merge, assign} from './merge';
import isFunction from '../utilities/isFunction';
import {BaseDescriptor} from '../descriptor/baseDescriptor';
import {Composer} from "./compose";

export interface FactoryBase {
  (options: any = {}, ...args: Array<any>): any;
}

export interface Factory extends FactoryBase, Composer { }

/**
 * Creates new factory instance.
 * @param {object} descriptor The information about the object the factory will be creating.
 * @returns {Function} The new factory function.
 */
export function createFactory(descriptor: BaseDescriptor): Factory {
    return function Stamp(options: any = {}, ...args: Array<any>): any {
        const obj = Object.create(descriptor.methods || {});

        merge(obj, descriptor.deepProperties);
        assign(obj, descriptor.properties);
        Object.defineProperties(obj, descriptor.propertyDescriptors || {});

        if (!descriptor.initializers || descriptor.initializers.length === 0) return obj;

        return descriptor.initializers.filter(isFunction).reduce((resultingObj, initializer) => {
            const returnedValue = initializer.call(resultingObj, options,
                                                   {instance: resultingObj, stamp: Stamp, args: [options].concat(args)});
            return returnedValue === undefined ? resultingObj : returnedValue;
        }, obj);
    };
}
