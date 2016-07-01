import slice from '../utilities/slice';
import {mergeComposable} from './mergeComposable';
import {createStamp} from './createStamp';
import {Composable, isComposable} from "./composable";
import {BaseDescriptor} from '../descriptor/baseDescriptor';
import {Stamp} from "../stampit";

export interface Compose {
  (...composables: Array<any | Composable>): Stamp
}

export interface Composer {
  compose(...composables: Array<any | Composable>): Stamp;
}

export function isComposer(target: any | Composer): target is Composer {
  return (undefined !== (target as Composer).compose);
}

/**
 * Given the list of composables (stamp descriptors and stamps) returns
 * a new stamp (composable factory function).
 * @param {...(object|Function)} [composables] The list of composables.
 * @returns {Function} A new stamp (aka composable factory function).
 */
export default function compose(...composables: Array<any | Composable>): Stamp {
  const descriptor: BaseDescriptor = (
      [this]
      .concat(slice.call(composables))
      .filter(isComposable)
      .reduce(mergeComposable, {})
  );
  return createStamp(descriptor, compose);
}
