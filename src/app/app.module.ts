import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppComponent } from './app.component';
import { EntityDataModule, EntityDataService } from '@ngrx/data';
import { entityConfig } from './post-entity-metadata';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment.development';
import { HttpClientModule } from '@angular/common/http';
import { PostsDataService } from './posts/post-data.service';
import { PostResolver } from './posts/post.resolver';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, routingComponents],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    EntityDataModule.forRoot(entityConfig),
  ],
  providers: [PostsDataService, PostResolver],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(
    entityDataService: EntityDataService,
    PostsDataService: PostsDataService
  ) {
    entityDataService.registerService('Post', PostsDataService);
  }
}
