import { Component, OnInit } from '@angular/core';
import { MainHttpService } from '@app/main/main-http.service';
import { ActivatedRoute, Params } from '@angular/router';
import { UnsubscribeAbstract } from '@shared/helpers/unsubscribe.abstract';
import { EMPTY, Observable, of, shareReplay, switchMap, takeUntil } from 'rxjs';

import { marks, PostInterfaceGet } from '@shared/models/post.interface';
import { PostsQuery } from '@app/main/state/posts.query';
import { PostsService } from '@app/main/state/posts.service';
import { tap } from 'rxjs/operators';
import { CommentInterface } from '@shared/models/comment.interface';
import { PostsStore } from '@app/main/state/posts.store';
import { CoreQuery } from '@app/core/state/core.query';
import { ID } from '@datorama/akita';
import { AuthService } from '@app/core/auth/auth.service';
import { NotificationService } from '@shared/services/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '@environment/environment';
import { MetaHelper } from '@shared/helpers/meta.helper';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: [ './post-page.component.scss' ]
})

export class PostPageComponent extends UnsubscribeAbstract implements OnInit {
  commentText = '';
  username = this.coreQuery.userName;
  item: PostInterfaceGet | undefined = undefined;

  constructor (
    private http: MainHttpService,
    private route: ActivatedRoute,
    private query: PostsQuery,
    private postsService: PostsService,
    private store: PostsStore,
    private coreQuery: CoreQuery,
    private authService: AuthService,
    private notificationService: NotificationService,
    private translate: TranslateService,
    private metaHelper: MetaHelper
  ) {
    super();
    this.item = this.route.snapshot.data['data'];
  }

  route$ = this.route.params.pipe(shareReplay(1), takeUntil(this.ngUnsubscribe$));

  item$: Observable<PostInterfaceGet | undefined> = this.route$.pipe(
    switchMap((params: Params) => {
      if (!params['id']) {
        return EMPTY;
      }
      if (this.query.getPost(params['id'])) { // check if post exists in store
        return of(this.query.getPost(params['id']));
      }
      return this.postsService.get<PostInterfaceGet>(params['id'], {skipWrite: true}).pipe(tap((res: PostInterfaceGet) => {
        this.updateMeta(res);
      })); // if no => request
    })
  );

  comments$: Observable<CommentInterface[]> = this.route$.pipe(
    switchMap((params: Params) => {
      if (!params['id']) {
        return EMPTY;
      }
      return this.postsService.getCommentsForPost(params['id']).pipe(tap((comments: CommentInterface[]) => {
        this.store.update({postComments: comments});
      }));
    })
  );

  ngOnInit (): void {
  }
  private updateMeta (item: PostInterfaceGet) {
    this.metaHelper.updateMeta({
      title: item.title,
      text: item.text,
      type: 'article',
      url: `${environment.websiteUrl}/${item._id}`,
      imgUrl: item.imgUrl
    });
  }

  mark (value: marks, comment: CommentInterface) {
    if (!this.coreQuery.isAuthenticated && !this.authService.getToken) {
      this.notificationService.openSnackBar('info', this.translate.instant('Notifications.401'));
      return;
    }
    if (this.coreQuery.tokenExpired && this.authService.getToken) {
      this.notificationService.openSnackBar('info', this.translate.instant('Notifications.token'));
      return;
    }

    if ((comment.marked === 'default' && value === 'liked')
      || (comment.marked === 'disliked' && value === 'disliked')
      || (comment.marked === 'disliked' && value === 'liked')) {
      comment.score++;
      this.changeMark(value, comment);
      this.sendMarkRequest(comment._id, 'liked');
    } else if ((comment.marked === 'default' && value === 'disliked')
      || (comment.marked === 'liked' && value === 'liked')
      || (comment.marked === 'liked' && value === 'disliked')) {
      comment.score--;
      this.changeMark(value, comment);
      this.sendMarkRequest(comment._id, 'disliked');
    }
  }

  changeMark (value: marks, comment: CommentInterface) {
    if (comment.marked !== 'default') {
      comment.marked = 'default';
    } else {
      comment.marked = value;
    }
  }

  private sendMarkRequest (id: ID, markType: marks) {
    this.postsService.changeCommentScore(id, markType).pipe(
      takeUntil(this.ngUnsubscribe$)).subscribe();
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
        return this.postsService.sendComment(params['id'], this.commentText);
      })
    ).subscribe((res: CommentInterface) => {
      this.commentText = '';
      const currentComments: CommentInterface[] = this.query.getValue().postComments;
      currentComments.unshift(res);
      this.store.update({postComments: currentComments});
    });
  }

  cancel () {
    this.commentText = '';
  }
}
