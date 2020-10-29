import { Component, Input, OnInit } from '@angular/core';
import FetchPosts from '../../../../../../business/usecases/FetchPosts';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

    @Input() id: number;

    @Input() title: string;

    @Input() body: string;

    constructor(){
    }// constructor()

    ngOnInit (): void {}// ngOnInit()

}