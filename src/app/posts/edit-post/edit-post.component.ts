import { map, Observable } from 'rxjs';
import { Component } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from 'src/app/models/post.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.less'],
})
export class EditPostComponent {
  postId!: string;
  editPostForm!: FormGroup;
  post$!: Observable<Post>;

  constructor(
    private router: Router,
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
        this.createForm(post?.title, post?.description);
        return post as Post;
      })
    );
  }

  createForm(title: string | undefined, description: string | undefined): void {
    this.editPostForm = new FormGroup({
      title: new FormControl(title, [
        Validators.required,
        Validators.minLength(6),
      ]),
      description: new FormControl(description, [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }

  onUpdatepost(): void {
    if (!this.editPostForm.valid) return;
    const post: Post = {
      id: this.postId,
      ...this.editPostForm.value,
    };
    this.postService.update(post);
    this.router.navigate(['/posts']);
  }

  showFormErrors(field: string): string | void {
    const targetField = this.editPostForm.get(field);
    if (targetField?.touched && !targetField.valid) {
      if (targetField.errors?.['required']) {
        return field[0].toUpperCase() + field.slice(1) + ' is required';
      }
      if (targetField.errors?.['minlength'] && field === 'title') {
        return 'Title must atleast have 6 characters';
      }
      if (targetField.errors?.['minlength'] && field === 'description') {
        return 'Description must atleast have 10 characters';
      }
    }
  }
}
