import { Component, OnInit } from '@angular/core';
import { EMPTY, exhaustMap, Observable, take, takeUntil } from 'rxjs';
import { PostInterfaceGet } from '@shared/models/post.interface';
import { environment } from '@environment/environment';
import { PostsService } from '@app/main/state/posts.service';
import { PostsQuery } from '@app/main/state/posts.query';
import { UnsubscribeAbstract } from '@shared/helpers/unsubscribe.abstract';
import { ID } from '@datorama/akita';
import { MetaHelper } from '@shared/helpers/meta.helper';
import { InfiniteScrollService } from '@shared/services/infinite-scroll.service';
import { tap } from 'rxjs/operators';
import { PostsStore } from '@app/main/state/posts.store';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: [ './content.component.scss' ]
})
export class ContentComponent extends UnsubscribeAbstract implements OnInit {
  // data$: Observable<PostInterfaceGet[]> = this.query.getPosts$().pipe(
  //   takeUntil(this.ngUnsubscribe$),
  //   switchMap((posts: PostInterfaceGet[]) => {
  //     if (posts && posts.length > 1) { // if post was created, then it was pushed to store and there is at least 1 item
  //       return this.query.getPosts$();
  //     }
  //     return this.postsService.get<PostInterfaceGet[]>();
  //   })
  // );
  page = 1;
  limit = 20;

  data: PostInterfaceGet[] = this.query.getPosts;
  data$: Observable<PostInterfaceGet[]> = this.query.getPosts$();

  devEnv = !environment.production;

  constructor (
    private http: PostsService,
    private postsService: PostsService,
    private store: PostsStore,
    private query: PostsQuery,
    private metaHelper: MetaHelper,
    private infiniteScrollService: InfiniteScrollService
  ) {
    super();
  }

  delete (id: ID) {
    this.http.delete(id).pipe(take(1)).subscribe();
  }

  ngOnInit (): void {
    this.updateMeta();
    this.getMorePosts();
  }

  private updateMeta () {
    this.metaHelper.resetMeta();
  }

  getMorePosts () {
    this.infiniteScrollService.mainScrollToBottomInPercents$.pipe(takeUntil(this.ngUnsubscribe$),
      exhaustMap((scroll: number | null) => {
        return this.postsService.getPostsPaginated(this.page, this.limit).pipe(takeUntil(this.ngUnsubscribe$));
      }))
      .subscribe((res) => {
        this.infiniteScrollService.setScrollToBottom(null);
        this.infiniteScrollService.wasOnLoadPosition = false;
        if (res.headers.get('x-page')) {
          this.page = +res.headers.get('x-page')! + 1;
        }
        const posts: PostInterfaceGet[] | null = res.body;
        if (posts && posts.length) {
          this.store.add(posts);
        }
      });

  }
}
