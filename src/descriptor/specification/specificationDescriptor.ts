import {CommonDescriptor} from '../common/commonDescriptor';
import {InitializerDescriptorProperty} from "../../utilities/extractFunctions";

export interface SpecificationDescriptor extends CommonDescriptor {

    methods?: Object;
    properties?: Object;
    initializers?: InitializerDescriptorProperty
    deepProperties?: Object;
    staticProperties?: Object;
    staticDeepProperties?: Object;
    propertyDescriptors?: PropertyDescriptorMap;
    staticPropertyDescriptors?: PropertyDescriptorMap;
    configuration?: Object;
    deepConfiguration?: Object;
}
