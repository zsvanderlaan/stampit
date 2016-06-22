import isFunction from '../utilities/isFunction';
import isObject from '../utilities/isObject';
import {merge, assign} from './merge';

const isDescriptor = isObject;

/**
 * Mutates the dstDescriptor by merging the srcComposable data into it.
 * @param {object} dstDescriptor The descriptor object to merge into.
 * @param {object} [srcComposable] The composable (either descriptor or stamp) to merge data form.
 * @returns {object} Returns the dstDescriptor argument.
 */
export function mergeComposable(dstDescriptor, srcComposable) {
    const srcDescriptor = (srcComposable && srcComposable.compose) || srcComposable;
    if (!isDescriptor(srcDescriptor)) return dstDescriptor;

    const combineProperty = (propName, action) => {
        if (!isObject(srcDescriptor[propName])) return;
        if (!isObject(dstDescriptor[propName])) dstDescriptor[propName] = {};
        action(dstDescriptor[propName], srcDescriptor[propName]);
    };

    combineProperty('methods', assign);
    combineProperty('properties', assign);
    combineProperty('deepProperties', merge);
    combineProperty('propertyDescriptors', assign);
    combineProperty('staticProperties', assign);
    combineProperty('staticDeepProperties', merge);
    combineProperty('staticPropertyDescriptors', assign);
    combineProperty('configuration', assign);
    combineProperty('deepConfiguration', merge);
    if (Array.isArray(srcDescriptor.initializers)) {
        dstDescriptor.initializers = srcDescriptor.initializers.reduce((result, init) => {
            if (isFunction(init) && result.indexOf(init) < 0) {
                result.push(init);
            }
            return result;
        }, Array.isArray(dstDescriptor.initializers) ? dstDescriptor.initializers : []);
    }

    return dstDescriptor;
}