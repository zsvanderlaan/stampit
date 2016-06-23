import {Stamp} from "./compose";
import {BaseDescriptor} from '../descriptor/baseDescriptor';

export type Composable = BaseDescriptor | Stamp;

export function isComposable(target: any | Composable): target is Composable {
  const type = typeof target;
  return !!target && (type === 'object' || type === 'function');
}
