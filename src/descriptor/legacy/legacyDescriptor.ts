import {CommonDescriptor} from '../common/commonDescriptor';

export interface LegacyDescriptor extends CommonDescriptor {

    methods?: Object;
    refs?: Object;
    props?: Object;
    init?: Array<Function>;
    deepProps?: Object;
    statics?: Object;
    deepStatics?: Object;
    conf?: Object;
    deepConf?: Object;
}