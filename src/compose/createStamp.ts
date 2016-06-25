import slice from '../utilities/slice';
import {merge, assign} from './merge';
import {createFactory, Factory, FactoryBase, isFactory} from './createFactory';
import {Stamp, Compose} from './compose';
import {BaseDescriptor} from '../descriptor/baseDescriptor';


/**
 * Returns a new stamp given a descriptor and a compose function implementation.
 * @param {object} [descriptor={}] The information about the object the stamp will be creating.
 * @param {Function} composeFunction The "compose" function implementation.
 * @returns {Function}
 */
export function createStamp(descriptor: BaseDescriptor, composeFunction: Compose): Stamp {
    const Stamp: Factory | FactoryBase = createFactory(descriptor);

    merge(Stamp, descriptor.staticDeepProperties);
    assign(Stamp, descriptor.staticProperties);
    Object.defineProperties(Stamp, descriptor.staticPropertyDescriptors || {});

    const composeImplementation: Compose = isFactory(Stamp) ? Stamp.compose : composeFunction;
    (Stamp as Factory).compose = function _compose(...args: Array<any>) {
        return composeImplementation.apply(this, slice.call(args));
    };
    assign((Stamp as Factory).compose, descriptor);

    return Stamp as Stamp;
}
