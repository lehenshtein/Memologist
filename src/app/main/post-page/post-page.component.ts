import { Component, OnInit } from '@angular/core';
import { MainHttpService } from '@app/main/main-http.service';
import { ActivatedRoute, Params } from '@angular/router';
import { UnsubscribeAbstract } from '@shared/helpers/unsubscribe.abstract';
import { EMPTY, Observable, of, switchMap, takeUntil } from 'rxjs';

import { PostInterfaceGet } from '@shared/models/post.interface';
import { PostsQuery } from '@app/main/state/posts.query';
import { PostsService } from '@app/main/state/posts.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: [ './post-page.component.scss' ]
})
export class PostPageComponent extends UnsubscribeAbstract implements OnInit {
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
      if (this.query.getPost(params['id'])) { // check if post exists in store
        return of(this.query.getPost(params['id']));
      }
      return this.postService.get<PostInterfaceGet>(params['id'],{skipWrite: true}) // if no => request
    })
  );

  ngOnInit (): void {
  }

}
