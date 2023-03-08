import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostResolver } from './post.resolver';
import { RouterModule, Routes } from '@angular/router';
import { entityMetadata } from '../post-entity-metadata';
import { PostsDataService } from '../posts/post-data.service';
import { AddPostComponent } from './add-post/add-post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditPostComponent } from './edit-post/edit-post.component';
import { PostsListComponent } from './posts-list/posts-list.component';
import { EntityDataService, EntityDefinitionService } from '@ngrx/data';
import { SinglePostComponent } from './single-post/single-post.component';

const routes: Routes = [
  {
    path: '',
    component: PostsListComponent,
    resolve: { posts: PostResolver },
  },
  { path: 'add', component: AddPostComponent },
  {
    path: 'edit/:id',
    component: EditPostComponent,
    resolve: { posts: PostResolver },
  },
  {
    path: 'details/:id',
    component: SinglePostComponent,
    resolve: { posts: PostResolver },
  },
];

@NgModule({
  declarations: [
    AddPostComponent,
    EditPostComponent,
    PostsListComponent,
    SinglePostComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  providers: [PostResolver, PostsDataService],
})
export class PostsModule {
  constructor(
    eds: EntityDefinitionService,
    entityDataService: EntityDataService,
    PostsDataService: PostsDataService
  ) {
    eds.registerMetadataMap(entityMetadata);
    entityDataService.registerService('Post', PostsDataService);
  }
}
