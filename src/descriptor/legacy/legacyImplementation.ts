import {specificationImplementation} from '../specification/specificationImplementation';

export interface LegacyImplementation {
    refs(...args: Array<Object>): any;
    props(...args: Array<Object>): any;
    init(...args: Array<Function>): any;
    deepProps(...args: Array<Object>): any;
    statics(...args: Array<Object>): any;
    deepStatics(...args: Array<Object>): any;
    conf(...args: Array<Object>): any;
    deepConf(...args: Array<Object>): any;
}

export const legacyImplementation: LegacyImplementation = {
    refs: specificationImplementation.properties,
    props: specificationImplementation.properties,
    init: specificationImplementation.initializers,
    deepProps: specificationImplementation.deepProperties,
    statics: specificationImplementation.staticProperties,
    deepStatics: specificationImplementation.staticDeepProperties,
    conf: specificationImplementation.configuration,
    deepConf: specificationImplementation.deepConfiguration,
};