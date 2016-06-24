import slice from './utilities/slice';
import {assign} from './compose/merge';
import {baseStampit} from './baseStampit';
import {baseImplementation} from './descriptor/baseImplementation';

function stampit() {
  return baseStampit.compose.apply(baseStampit, slice.call(arguments));
}

export default assign(stampit, baseImplementation);
