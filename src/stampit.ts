import isStamp from './utilities/isStamp';
import slice from './utilities/slice';
import {assign} from './compose/merge';
import {baseStampit} from './baseStampit';
import {specificationImplementation} from './descriptor/specification/specificationImplementation';
import {isComposable} from './compose/composable';

function stampit() {
  return baseStampit.compose.apply(baseStampit, slice.call(arguments));
}

export default assign(stampit, {
    isStamp,
    isComposable,
    compose: baseStampit.compose,
    refs: specificationImplementation.properties,
    props: specificationImplementation.properties,
    init: specificationImplementation.initializers,
    deepProps: specificationImplementation.deepProperties,
    statics: specificationImplementation.staticProperties,
    deepStatics: specificationImplementation.staticDeepProperties,
    conf: specificationImplementation.configuration,
    deepConf: specificationImplementation.deepConfiguration
  },
                      specificationImplementation
);
