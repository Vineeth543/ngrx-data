import { Injectable } from '@angular/core';
import { PostService } from './post.service';
import { first, Observable, tap } from 'rxjs';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';

@Injectable()
export class PostResolver implements Resolve<boolean> {
  constructor(private postService: PostService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this.postService.loaded$.pipe(
      tap((loaded) => (!loaded ? this.postService.getAll() : null)),
      first()
    );
  }
}
