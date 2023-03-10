import { Observable } from 'rxjs';
import { PostService } from '../post.service';
import { Post } from 'src/app/models/post.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.less'],
})
export class PostsListComponent implements OnInit {
  posts$!: Observable<Post[]>;
  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.posts$ = this.postService.entities$;
  }

  onDeletePost(id: string) {
    this.postService.delete(id);
  }
}
