import { EntityMetadataMap } from '@ngrx/data';
import { EntityDataModuleConfig } from '@ngrx/data/src';

const entityMetadata: EntityMetadataMap = {
  Post: {
    entityDispatcherOptions: {
      optimisticUpdate: true,
    },
  },
};

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata: entityMetadata,
};
