import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Post from '../../../../../../business/domain/post';
import FetchPosts from '../../../../../../business/usecases/FetchPosts';

@Component({
  selector: 'app-fullpost',
  templateUrl: './fullpost.component.html',
  styleUrls: ['./fullpost.component.scss']
})
export class FullPostComponent implements OnInit {

    post: Post;

    constructor(private route: ActivatedRoute, private fetchPosts: FetchPosts){
      this.post = null;
    }// constructor()

    async ngOnInit (): Promise<void> {
      const id = parseInt(this.route.snapshot.paramMap.get('id'));
      this.post = await this.fetchPosts.findById(id);
    }// ngOnInit()

}