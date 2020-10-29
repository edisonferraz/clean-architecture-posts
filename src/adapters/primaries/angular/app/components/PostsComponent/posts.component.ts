import { Component, OnInit } from '@angular/core';
import Post from '../../../../../../business/domain/post';
import FetchPosts from '../../../../../../business/usecases/FetchPosts';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

    posts: Post[];

    constructor(private fetchPosts: FetchPosts){
        this.posts = [];
    }// constructor()

    async ngOnInit (): Promise<void> {
        this.posts = await this.fetchPosts.getAllPosts();
    }// ngOnInit()

}