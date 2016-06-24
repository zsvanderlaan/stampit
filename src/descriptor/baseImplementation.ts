import {SpecificationImplementation, specificationImplementation} from './specification/specificationImplementation';
import {LegacyImplementation, legacyImplementation} from './legacy/legacyImplementation';
import {assign} from '../compose/merge';

export interface BaseImplementation extends SpecificationImplementation, LegacyImplementation { }

export const baseImplementation: BaseImplementation = assign(specificationImplementation, legacyImplementation);