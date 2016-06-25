import {CommonDescriptor} from '../common/commonDescriptor';
import {InitializerDescriptorProperty} from "../../utilities/extractFunctions";

export interface LegacyDescriptor extends CommonDescriptor {

    methods?: Object;
    refs?: Object;
    props?: Object;
    init?: InitializerDescriptorProperty;
    deepProps?: Object;
    statics?: Object;
    deepStatics?: Object;
    conf?: Object;
    deepConf?: Object;
}
