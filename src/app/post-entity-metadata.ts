import { EntityMetadataMap } from '@ngrx/data';
import { EntityDataModuleConfig } from '@ngrx/data/src';

const entityMetadata: EntityMetadataMap = {
  Post: {},
};

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata: entityMetadata,
};
