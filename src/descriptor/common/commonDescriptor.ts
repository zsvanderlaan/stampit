import {Stamp} from '../../compose/compose';
import {Composable} from '../../compose/composable';

export interface CommonDescriptor {
    create?(...composables: Array<any | Composable>): Stamp;
    compose?(...composables: Array<any | Composable>): Stamp;
}