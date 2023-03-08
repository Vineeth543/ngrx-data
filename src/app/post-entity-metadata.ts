import { Post } from './models/post.model';
import { EntityMetadataMap } from '@ngrx/data';
import { EntityDataModuleConfig } from '@ngrx/data/src';

export const entityMetadata: EntityMetadataMap = {
  Post: {
    sortComparer: sortByTitle,
    entityDispatcherOptions: {
      optimisticUpdate: true,
    },
  },
};

function sortByTitle(a: Post, b: Post): number {
  return a.title.localeCompare(b.title);
}

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata: entityMetadata,
};
