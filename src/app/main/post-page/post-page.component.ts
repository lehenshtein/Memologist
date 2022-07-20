import { Component, OnInit } from '@angular/core';
import { MainHttpService } from '@app/main/main-http.service';
import { ActivatedRoute, Params } from '@angular/router';
import { UnsubscribeAbstract } from '@shared/helpers/unsubscribe.abstract';
import { EMPTY, Observable, of, shareReplay, switchMap, takeUntil } from 'rxjs';

import { PostInterfaceGet } from '@shared/models/post.interface';
import { PostsQuery } from '@app/main/state/posts.query';
import { PostsService } from '@app/main/state/posts.service';
import { tap } from 'rxjs/operators';
import { CommentInterface } from '@shared/models/comment.interface';
import { PostsStore } from '@app/main/state/posts.store';
import { CoreQuery } from '@app/core/state/core.query';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: [ './post-page.component.scss' ]
})

export class PostPageComponent extends UnsubscribeAbstract implements OnInit {
  commentText = '';
  username = this.coreQuery.userName;

  constructor (
    private http:MainHttpService,
    private route: ActivatedRoute,
    private query: PostsQuery,
    private postService: PostsService,
    private store: PostsStore,
    private coreQuery: CoreQuery
  ) {
    super();
  }

  route$ = this.route.params.pipe(tap(() => console.log('request')), shareReplay(1), takeUntil(this.ngUnsubscribe$));

  item$: Observable<PostInterfaceGet | undefined> = this.route$.pipe(
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

  comments$: Observable<CommentInterface[]> = this.route$.pipe(
    switchMap((params: Params) => {
      if (!params['id']) {
        return EMPTY;
      }
      return this.postService.getCommentsForPost(params['id']).pipe(tap((comments: CommentInterface[]) => {
        this.store.update({postComments: comments})
      }))
    })
  );

  ngOnInit (): void {
    console.log(this.username);
  }

  mark (disliked: string) {

  }

  submit () {
    if (!this.commentText) {
      return;
    }
    this.route$.pipe(
      switchMap((params: Params) => {
        if (!params['id']) {
          return EMPTY;
        }
        return this.postService.sendComment(params['id'], this.commentText)
      })
    ).subscribe((res: CommentInterface) => {
      this.commentText = '';
      const currentComments: CommentInterface[] = this.query.getValue().postComments;
      currentComments.unshift(res);
      this.store.update({postComments: currentComments});
    })
  }

  cancel () {
    this.commentText = '';
  }
}
