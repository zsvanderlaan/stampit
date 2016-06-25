import compose from './compose/compose';
import {baseImplementation} from './descriptor/baseImplementation';
import {Stamp} from "./compose/compose";

export const baseStampit: Stamp = compose({ staticProperties: baseImplementation });
