import compose from '../compose/compose';
import slice from '../utilities/slice';
import isStamp from '../utilities/isStamp';
import {standardiseDescriptor} from './standardiseDescriptor';

export const coreImplementation = {
    create() {
        return this.apply(undefined, arguments);
    },

    compose() {
        return compose.apply(
            this
            , slice.call(arguments)
                   .filter(isComposable)
                   .map(arg => isStamp(arg) ? arg : standardiseDescriptor(arg))
        );
    }
};