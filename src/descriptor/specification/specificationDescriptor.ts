import {CommonDescriptor} from '../common/commonDescriptor';

export interface SpecificationDescriptor extends CommonDescriptor {

    methods?: Object;
    properties?: Object;
    initializers?: Array<Function>;
    deepProperties?: Object;
    staticProperties?: Object;
    staticDeepProperties?: Object;
    propertyDescriptors?: Object;
    staticPropertyDescriptors?: Object;
    configuration?: Object;
    deepConfiguration?: Object;
}