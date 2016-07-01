import {BaseDescriptor} from '../descriptor/baseDescriptor';
import {Stamp} from "../stampit";

export type Composable = BaseDescriptor | Stamp;

export function isComposable(target: any | Composable): target is Composable {
  const type = typeof target;
  return !!target && (type === 'object' || type === 'function');
}
