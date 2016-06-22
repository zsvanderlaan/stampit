import isObject from '../utilities/isObject';
import {merge, assign} from '../compose/merge';
import {extractFunctions} from '../utilities/extractFunctions';
import {BaseDescriptor} from './baseDescriptor';
import {LegacyDescriptor} from './legacyDescriptor';

export function standardiseDescriptor(legacyDescriptor: LegacyDescriptor = {}): BaseDescriptor {
    const properties = (
        (isObject(legacyDescriptor.props)
        || isObject(legacyDescriptor.refs)
        || isObject(legacyDescriptor.properties))
        ? assign({}, legacyDescriptor.props, legacyDescriptor.refs, legacyDescriptor.properties)
        : undefined
    );

    let deepProperties = isObject(legacyDescriptor.deepProps)
        ? merge({}, legacyDescriptor.deepProps)
        : undefined;
    
    deepProperties = isObject(legacyDescriptor.deepProperties)
        ? merge(deepProperties, legacyDescriptor.deepProperties)
        : deepProperties;

    const staticProperties = isObject(legacyDescriptor.statics) || isObject(legacyDescriptor.staticProperties)
        ? assign({}, legacyDescriptor.statics, legacyDescriptor.staticProperties)
        : undefined;

    let deepStaticProperties = isObject(legacyDescriptor.deepStatics)
        ? merge({}, legacyDescriptor.deepStatics)
        : undefined;
    
    deepStaticProperties = isObject(legacyDescriptor.staticDeepProperties)
        ? merge(deepStaticProperties, legacyDescriptor.staticDeepProperties)
        : deepStaticProperties;

    const configuration = isObject(legacyDescriptor.conf) || isObject(legacyDescriptor.configuration)
        ? assign({}, legacyDescriptor.conf, legacyDescriptor.configuration)
        : undefined;

    let deepConfiguration = isObject(legacyDescriptor.deepConf)
        ? merge({}, legacyDescriptor.deepConf)
        : undefined;
    
    deepConfiguration = isObject(legacyDescriptor.deepConfiguration)
        ? merge(deepConfiguration, legacyDescriptor.deepConfiguration)
        : deepConfiguration;

    return {
        methods: legacyDescriptor.methods,
        properties: properties,
        initializers: extractFunctions(legacyDescriptor.init, legacyDescriptor.initializers),
        deepProperties: deepProperties,
        staticProperties: staticProperties,
        staticDeepProperties: deepStaticProperties,
        propertyDescriptors: legacyDescriptor.propertyDescriptors,
        staticPropertyDescriptors: legacyDescriptor.staticPropertyDescriptors,
        configuration: configuration,
        deepConfiguration: deepConfiguration
    };
}