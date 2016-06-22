import isComposable from './utilities/isComposable';
import isStamp from './utilities/isStamp';
import slice from './utilities/slice';
import {assign} from './compose/merge';
import {baseStampit} from './baseStampit';
import {descriptorImplementation} from './descriptor/descriptorImplementation';

function stampit() {
  return baseStampit.compose.apply(baseStampit, slice.call(arguments));
}

export default assign(stampit, {
    isStamp,
    isComposable,
    compose: baseStampit.compose,
    refs: descriptorImplementation.properties,
    props: descriptorImplementation.properties,
    init: descriptorImplementation.initializers,
    deepProps: descriptorImplementation.deepProperties,
    statics: descriptorImplementation.staticProperties,
    deepStatics: descriptorImplementation.staticDeepProperties,
    conf: descriptorImplementation.configuration,
    deepConf: descriptorImplementation.deepConfiguration
  },
  descriptorImplementation
);
