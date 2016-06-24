import compose from './compose/compose';
import {baseImplementation} from './descriptor/baseImplementation';

export const baseStampit = compose({ staticProperties: baseImplementation });