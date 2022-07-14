import { Component, OnInit } from '@angular/core';
import { MainHttpService } from '@app/main/main-http.service';
import { ActivatedRoute, Params } from '@angular/router';
import { UnsubscribeAbstract } from '@shared/helpers/unsubscribe.abstract';
import { catchError, EMPTY, Observable, switchMap, takeUntil, throwError } from 'rxjs';

import { PostInterfaceGet } from '@shared/models/post.interface';
import { PostsQuery } from '@app/main/state/posts.query';
import { HttpErrorResponse } from '@angular/common/http';
import { PostsService } from '@app/main/state/posts.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: [ './post-page.component.scss' ]
})
export class PostPageComponent extends UnsubscribeAbstract implements OnInit {
  descriptionTags = [];
  constructor (
    private http:MainHttpService,
    private route: ActivatedRoute,
    private query: PostsQuery,
    private postService: PostsService
  ) {
    super();
  }

  item$: Observable<PostInterfaceGet | undefined> = this.route.params.pipe(
    takeUntil(this.ngUnsubscribe$),
    switchMap((params: Params) => {
      if (!params['id']) {
        return EMPTY;
      }
      return this.postService.get<PostInterfaceGet>(params['id'],{skipWrite: true}).pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(() => err);
        }))
    })
  );

  ngOnInit (): void {
  }

}
