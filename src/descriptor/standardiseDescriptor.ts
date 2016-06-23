import isObject from '../utilities/isObject';
import {merge, assign} from '../compose/merge';
import {extractFunctions} from '../utilities/extractFunctions';
import {SpecificationDescriptor} from './specification/specificationDescriptor';
import {BaseDescriptor} from './baseDescriptor';

export function standardiseDescriptor(descriptor: BaseDescriptor = {}): SpecificationDescriptor {
    const properties = (
        (isObject(descriptor.props)
        || isObject(descriptor.refs)
        || isObject(descriptor.properties))
        ? assign({}, descriptor.props, descriptor.refs, descriptor.properties)
        : undefined
    );

    let deepProperties = isObject(descriptor.deepProps)
        ? merge({}, descriptor.deepProps)
        : undefined;
    
    deepProperties = isObject(descriptor.deepProperties)
        ? merge(deepProperties, descriptor.deepProperties)
        : deepProperties;

    const staticProperties = isObject(descriptor.statics) || isObject(descriptor.staticProperties)
        ? assign({}, descriptor.statics, descriptor.staticProperties)
        : undefined;

    let deepStaticProperties = isObject(descriptor.deepStatics)
        ? merge({}, descriptor.deepStatics)
        : undefined;
    
    deepStaticProperties = isObject(descriptor.staticDeepProperties)
        ? merge(deepStaticProperties, descriptor.staticDeepProperties)
        : deepStaticProperties;

    const configuration = isObject(descriptor.conf) || isObject(descriptor.configuration)
        ? assign({}, descriptor.conf, descriptor.configuration)
        : undefined;

    let deepConfiguration = isObject(descriptor.deepConf)
        ? merge({}, descriptor.deepConf)
        : undefined;
    
    deepConfiguration = isObject(descriptor.deepConfiguration)
        ? merge(deepConfiguration, descriptor.deepConfiguration)
        : deepConfiguration;

    return {
        methods: descriptor.methods,
        properties: properties,
        initializers: extractFunctions(descriptor.init, descriptor.initializers),
        deepProperties: deepProperties,
        staticProperties: staticProperties,
        staticDeepProperties: deepStaticProperties,
        propertyDescriptors: descriptor.propertyDescriptors,
        staticPropertyDescriptors: descriptor.staticPropertyDescriptors,
        configuration: configuration,
        deepConfiguration: deepConfiguration
    };
}