import isFunction from '../utilities/isFunction';
import slice from '../utilities/slice';
import {merge, assign} from './merge';
import {createFactory} from './createFactory';
import {Stamp, Compose} from './compose';
import {BaseDescriptor} from '../descriptor/baseDescriptor';


/**
 * Returns a new stamp given a descriptor and a compose function implementation.
 * @param {object} [descriptor={}] The information about the object the stamp will be creating.
 * @param {Function} composeFunction The "compose" function implementation.
 * @returns {Function}
 */
export function createStamp(descriptor: BaseDescriptor, composeFunction: Compose): Stamp {
    const Stamp = createFactory(descriptor);

    merge(Stamp, descriptor.staticDeepProperties);
    assign(Stamp, descriptor.staticProperties);
    Object.defineProperties(Stamp, descriptor.staticPropertyDescriptors || {});

    const composeImplementation = isFunction(Stamp.compose) ? Stamp.compose : composeFunction;
    Stamp.compose = function _compose() {
        return composeImplementation.apply(this, slice.call(arguments));
    };
    assign(Stamp.compose, descriptor);

    return Stamp;
}