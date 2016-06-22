import {descriptorImplementation} from './descriptorImplementation';

export const legacyDescriptorImplementation = {
    refs: descriptorImplementation.properties,
    props: descriptorImplementation.properties,
    init: descriptorImplementation.initializers,
    deepProps: descriptorImplementation.deepProperties,
    statics: descriptorImplementation.staticProperties,
    deepStatics: descriptorImplementation.staticDeepProperties,
    conf: descriptorImplementation.configuration,
    deepConf: descriptorImplementation.deepConfiguration,
};