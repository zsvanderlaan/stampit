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
  isStamp(...args: Array<any>): boolean;
  isComposable(...args: Array<any>): boolean;
}

export const commonImplementation: CommonImplementation = {
    create: create
    , compose: compose
    , isComposable: isComposable
    , isStamp: isStamp
};

function create(...composables: Array<any | Composable>): Stamp {
    return this.apply(undefined, composables);
}

function compose(...composables: Array<any | Composable>): Stamp {
    return compose.apply(
        this
        , slice.call(composables)
               .filter(isComposable)
               .map((arg: Composable) => isStamp(arg) ? arg : standardiseDescriptor(arg))
    );
}