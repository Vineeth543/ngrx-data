import { Router } from '@angular/router';
import { PostService } from '../post.service';
import { Post } from 'src/app/models/post.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.less'],
})
export class AddPostComponent implements OnInit {
  addPostForm!: FormGroup;

  constructor(private postService: PostService, private router: Router) {}

  ngOnInit(): void {
    this.addPostForm = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }

  onAddPost(): void {
    if (!this.addPostForm.valid) return;
    const post: Post = this.addPostForm.value;
    this.postService.add(post);
    this.router.navigate(['/posts']);
  }

  showFormErrors(field: string): string | void {
    const targetField = this.addPostForm.get(field);
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
