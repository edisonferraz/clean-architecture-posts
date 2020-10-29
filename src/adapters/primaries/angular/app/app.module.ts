import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import FetchPosts from '../../../../business/usecases/FetchPosts';
import { getInstanceApi } from '../../../secondaries/factoryApiPosts';
import { PostsComponent } from './components/PostsComponent/posts.component';
import { PostComponent } from './components/PostComponent/post.component';
import { FullPostComponent } from './components/FullPostComponent/fullpost.component';

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    PostComponent,
    FullPostComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [
    {
      provide: FetchPosts,
      useFactory: () => new FetchPosts(getInstanceApi()),
      deps: []
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }