import compose from '../../compose/compose';
import slice from '../../utilities/slice';
import isStamp from '../../utilities/isStamp';
import {standardiseDescriptor} from '../standardiseDescriptor';
import {Composable} from "../../compose/compose";
import {isComposable} from "../../compose/composable";
import {Stamp} from "../../compose/compose";

export interface CommonImplementation {
  create(...composables: Array<any | Composable>): Stamp;
  compose(...composables: Array<any | Composable>): Stamp;
}

export const commonImplementation: CommonImplementation = {

    create(...composables: Array<any | Composable>): Stamp {
        return this.apply(undefined, composables);
    },

    compose(...composables: Array<any | Composable>): Stamp {
        return compose.apply(
            this
            , slice.call(composables)
                   .filter(isComposable)
                   .map((arg: Composable) => isStamp(arg) ? arg : standardiseDescriptor(arg))
        );
    }
};
