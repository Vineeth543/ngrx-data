import { Observable, map } from 'rxjs';
import { Component } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from 'src/app/models/post.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.less'],
})
export class SinglePostComponent {
  postId!: string;
  post$!: Observable<Post>;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.postId = this.route.snapshot.params['id'];
    this.post$ = this.postService.entities$.pipe(
      map((posts: Post[]) => {
        const post: Post | undefined = posts.find(
          (post: Post) => post.id === this.postId
        );
        return post as Post;
      })
    );
  }
}
