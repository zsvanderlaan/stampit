import compose from './compose/compose';
import {baseImplementation} from './descriptor/baseImplementation';
import {Stamp} from "./stampit";

export const baseStampit: Stamp = compose({ staticProperties: baseImplementation });
