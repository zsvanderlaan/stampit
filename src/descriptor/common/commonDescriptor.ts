import {Composable} from '../../compose/composable';
import {Stamp} from "../../stampit";

export interface CommonDescriptor {
    create?(...composables: Array<any | Composable>): Stamp;
    compose?(...composables: Array<any | Composable>): Stamp;
}
