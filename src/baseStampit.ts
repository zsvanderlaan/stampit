import compose from './compose/compose';
import {assign} from './compose/merge';
import {coreImplementation} from './descriptor/coreImplementation';
import {descriptorImplementation} from './descriptor/descriptorImplementation';
import {legacyDescriptorImplementation} from './descriptor/legacyDescriptorImplementation';

const descriptorImplementation = assign(legacyDescriptorImplementation, descriptorImplementation);
const staticProperties = assign(descriptorImplementation, coreImplementation);

export const baseStampit = compose({ staticProperties: staticProperties });