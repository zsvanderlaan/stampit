import {CommonImplementation, commonImplementation} from './common/commonImplementation';
import {SpecificationImplementation, specificationImplementation} from './specification/specificationImplementation';
import {LegacyImplementation, legacyImplementation} from './legacy/legacyImplementation';
import {assign} from '../compose/merge';

export interface BaseImplementation extends SpecificationImplementation, CommonImplementation, LegacyImplementation { }

/*
 const descriptorImplementation = assign(legacyImplementation, specificationImplementation);
 const staticProperties = assign(descriptorImplementation, commonImplementation);
 */
let legacy = assign(commonImplementation, legacyImplementation);
export const baseImplementation: BaseImplementation = assign(legacy, specificationImplementation);