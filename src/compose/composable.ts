import {Stamp} from "./compose";
import {LegacyDescriptor} from "../descriptor/legacyDescriptor";

export type Composable = LegacyDescriptor | Stamp;

export function isComposable(target: any | Composable): target is Composable {
  const type = typeof target;
  return !!target && (type === 'object' || type === 'function');
}
