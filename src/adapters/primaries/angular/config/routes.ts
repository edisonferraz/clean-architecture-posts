import { Routes } from '@angular/router';
import { FullPostComponent } from '../app/components/FullPostComponent/fullpost.component';
import { PostsComponent } from '../app/components/PostsComponent/posts.component';

export const routes: Routes = [ { path: '', component: PostsComponent }, 
                                { path: 'post/:id', component: FullPostComponent } 
                            ];