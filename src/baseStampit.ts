import compose from './compose/compose';
import {assign} from './compose/merge';
import {commonImplementation} from './descriptor/common/commonImplementation';
import {specificationImplementation} from './descriptor/specification/specificationImplementation';
import {legacyImplementation} from './descriptor/legacy/legacyImplementation';

const descriptorImplementation = assign(legacyImplementation, specificationImplementation);
const staticProperties = assign(descriptorImplementation, commonImplementation);

export const baseStampit = compose({ staticProperties: staticProperties });