export interface LegacyDescriptor {

    methods?: Object;

    properties?: Object;
    props?: Object;
    refs?: Object;

    initializers?: Array<Function>;
    init?: Array<Function>;

    deepProperties?: Object;
    deepProps?: Object;

    propertyDescriptors?: Object;

    staticProperties?: Object;
    statics?: Object;

    staticDeepProperties?: Object;
    deepStatics?: Object;

    staticPropertyDescriptors?: Object;

    configuration?: Object;
    conf?: Object;

    deepConfiguration?: Object;
    deepConf?: Object;
}