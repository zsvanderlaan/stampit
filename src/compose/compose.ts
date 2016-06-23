import slice from '../utilities/slice';
import {mergeComposable} from './mergeComposable';
import {createStamp} from './createStamp';
import {Composable, isComposable} from "./composable";
import {BaseDescriptor} from "../descriptor/baseDescriptor";

// this is probably going to end up being baseDescriptor in the end
// interface StampDescriptor extends Object or Function {
//
// }

export interface Stamp extends Function, BaseDescriptor {

}


/**
 * Given the list of composables (stamp descriptors and stamps) returns
 * a new stamp (composable factory function).
 * @param {...(object|Function)} [composables] The list of composables.
 * @returns {Function} A new stamp (aka composable factory function).
 */
export default function compose(...composables: Array<any | Composable>): Stamp {
  const descriptor = [this]
    .concat(slice.call(composables))
    .filter(isComposable)
    .reduce(mergeComposable, {});
  return createStamp(descriptor, compose);
}
