import compose from '../../compose/compose';
import slice from '../../utilities/slice';
import {merge, assign} from '../../compose/merge';
import {extractFunctions} from '../../utilities/extractFunctions';
import {composeArgsCall} from '../../utilities/composeArgsCall';
import {CommonImplementation, commonImplementation} from '../common/commonImplementation';

export interface SpecificationImplementation extends CommonImplementation {
    methods(...args: Array<Object>): any;
    properties(...args: Array<Object>): any;
    initializers(...args: Array<Function>): any;
    deepProperties(...args: Array<Object>): any;
    staticProperties(...args: Array<Object>): any;
    staticDeepProperties(...args: Array<Object>): any;
    configuration(...args: Array<Object>): any;
    deepConfiguration(...args: Array<Object>): any;
}

export const specificationImplementation: SpecificationImplementation = assign({
    methods: methods
    , properties: properties
    , initializers: initializers
    , deepProperties: deepProperties
    , staticProperties: staticProperties
    , staticDeepProperties: staticDeepProperties
    , configuration: configuration
    , deepConfiguration: deepConfiguration
}, commonImplementation);

function methods(...args: Array<Object>) {
    return composeArgsCall(this, 'methods', assign, args);
}

function properties(...args: Array<Object>) {
    return composeArgsCall(this, 'properties', assign, args);
}

function initializers(...args: Array<Function>) {
    return (this.compose || compose).call(this, {
        initializers: extractFunctions.apply(null, slice.call(args))
    });
}

function deepProperties(...args: Array<Object>) {
    return composeArgsCall(this, 'deepProperties', merge, args);
}

function staticProperties(...args: Array<Object>) {
    return composeArgsCall(this, 'staticProperties', assign, args);
}

function staticDeepProperties(...args: Array<Object>) {
    return composeArgsCall(this, 'staticDeepProperties', merge, args);
}

function configuration(...args: Array<Object>) {
    return composeArgsCall(this, 'configuration', assign, args);
}

function deepConfiguration(...args: Array<Object>) {
    return composeArgsCall(this, 'deepConfiguration', merge, args);
}