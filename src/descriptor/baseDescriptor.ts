import {LegacyDescriptor} from './legacy/legacyDescriptor';
import {SpecificationDescriptor} from './specification/specificationDescriptor';

export interface BaseDescriptor extends SpecificationDescriptor, LegacyDescriptor { }