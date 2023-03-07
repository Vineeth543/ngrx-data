import { EntityMetadataMap } from '@ngrx/data';
import { EntityDataModuleConfig } from '@ngrx/data/src';

const entityMetaData: EntityMetadataMap = {
  Post: {},
};

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata: entityMetaData,
};
