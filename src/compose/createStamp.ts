import slice from '../utilities/slice';
import {merge, assign} from './merge';
import {createFactory, Factory} from './createFactory';
import {Stamp, Compose, isComposer} from './compose';
import {BaseDescriptor} from '../descriptor/baseDescriptor';


/**
 * Returns a new stamp given a descriptor and a compose function implementation.
 * @param {object} [descriptor={}] The information about the object the stamp will be creating.
 * @param {Function} composeFunction The "compose" function implementation.
 * @returns {Function}
 */
export function createStamp(descriptor: BaseDescriptor, composeFunction: Compose): Stamp {
    const Stamp: Factory = createFactory(descriptor);

    merge(Stamp, descriptor.staticDeepProperties);
    assign(Stamp, descriptor.staticProperties);
    Object.defineProperties(Stamp, descriptor.staticPropertyDescriptors || {});

    const composeImplementation: Compose = isComposer(Stamp) ? Stamp.compose : composeFunction;
    Stamp.compose = function _compose() {
        return composeImplementation.apply(this, slice.call(arguments));
    };
    assign(Stamp.compose, descriptor);

    return Stamp;
}
