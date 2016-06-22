import isObject from '../utilities/isObject';
import slice from '../utilities/slice';
import {mergeComposable} from './mergeComposable';
import {createStamp} from './createStamp';

/**
 * Given the list of composables (stamp descriptors and stamps) returns
 * a new stamp (composable factory function).
 * @param {...(object|Function)} [composables] The list of composables.
 * @returns {Function} A new stamp (aka composable factory function).
 */
export default function compose(...composables: Array<Object | Function>): Function {
  const descriptor = [this]
    .concat(slice.call(composables))
    .filter(isObject)
    .reduce(mergeComposable, {});
  return createStamp(descriptor, compose);
}