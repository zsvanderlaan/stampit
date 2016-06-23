import compose from '../../compose/compose';
import slice from '../../utilities/slice';
import {merge, assign} from '../../compose/merge';
import {extractFunctions} from '../../utilities/extractFunctions';
import {composeArgsCall} from '../../utilities/composeArgsCall';

export interface SpecificationImplementation {
    methods(...args: Array<Object>): any;
    properties(...args: Array<Object>): any;
    initializers(...args: Array<Function>): any;
    deepProperties(...args: Array<Object>): any;
    staticProperties(...args: Array<Object>): any;
    staticDeepProperties(...args: Array<Object>): any;
    configuration(...args: Array<Object>): any;
    deepConfiguration(...args: Array<Object>): any;
}

export const specificationImplementation: SpecificationImplementation = {
    methods(...args: Array<Object>) {
        return composeArgsCall(this, 'methods', assign, args);
    }
    , properties(...args: Array<Object>) {
        return composeArgsCall(this, 'properties', assign, args);
    }
    , initializers(...args: Array<Function>) {
        return (this.compose || compose).call(this, {
            initializers: extractFunctions.apply(null, slice.call(args))
        });
    }
    , deepProperties(...args: Array<Object>) {
        return composeArgsCall(this, 'deepProperties', merge, args);
    }
    , staticProperties(...args: Array<Object>) {
        return composeArgsCall(this, 'staticProperties', assign, args);
    }
    , staticDeepProperties(...args: Array<Object>) {
        return composeArgsCall(this, 'staticDeepProperties', merge, args);
    }
    , configuration(...args: Array<Object>) {
        return composeArgsCall(this, 'configuration', assign, args);
    }
    , deepConfiguration(...args: Array<Object>) {
        return composeArgsCall(this, 'deepConfiguration', merge, args);
    }
};