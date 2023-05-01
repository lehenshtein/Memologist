import { Component, Input, OnInit } from '@angular/core';
import { EMPTY, exhaustMap, Observable, switchMap, take, takeUntil } from 'rxjs';
import { PostInterfaceGet, sort } from '@shared/models/post.interface';
import { PostsService } from '@app/main/state/posts.service';
import { PostsQuery } from '@app/main/state/posts.query';
import { UnsubscribeAbstract } from '@shared/helpers/unsubscribe.abstract';
import { ID } from '@datorama/akita';
import { MetaHelper } from '@shared/helpers/meta.helper';
import { InfiniteScrollService } from '@shared/services/infinite-scroll.service';
import { PostsStore } from '@app/main/state/posts.store';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from '@shared/modals/confirm-modal/confirm-modal.component';
import { HttpResponse } from '@angular/common/http';
import { CoreQuery } from '@app/core/state/core.query';
import { roles } from '@shared/models/user.interface';

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
  @Input() userName?: string;
  @Input() contentType: 'posts' | 'userPosts' = 'posts';
  page = 1;
  limit = 20;
  sort: sort | null = null;
  searchValue?: string = '';
  showFooter = false;

  // data: PostInterfaceGet[] = this.query.getPosts;
  data$: Observable<PostInterfaceGet[]> = this.query.getPosts$();
  userMode$: Observable<roles> = this.coreQuery.userMode$;
  getPosts = (page: number, limit: number, sort: sort| null, search?: string): Observable<HttpResponse<PostInterfaceGet[]>> => {
    return this.postsService.getPostsPaginated(page, limit, sort || 'hot', search)
  };
  getPostsForUser = (page: number, limit: number, username: string, search?: string): Observable<HttpResponse<PostInterfaceGet[]>> => {
    return this.postsService.getUserPostsPaginated(page, limit, username, search);
  };

  constructor (
    private http: PostsService,
    private postsService: PostsService,
    private store: PostsStore,
    private query: PostsQuery,
    private metaHelper: MetaHelper,
    private infiniteScrollService: InfiniteScrollService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private coreQuery: CoreQuery
  ) {
    super();
    if (this.sort !== route.snapshot.data['sort']) {
      this.store.reset();
      this.sort = route.snapshot.data['sort'];
    }

  }

  delete (id: ID) {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: {title: 'Confirm', text: 'Are you sure you want to delete this post?', isCancelable: true},
      maxHeight: '90vh'
    });
    dialogRef.afterClosed().pipe(switchMap((result) => {
      if (!result) {
        return EMPTY;
      }
      return this.http.delete(id).pipe(take(1))
    })).subscribe();
  }

  ngOnInit (): void {
    this.metaHelper.resetMeta();
    this.search();
  }

  getMorePosts () {
    this.infiniteScrollService.mainScrollToBottomInPercents$.pipe(takeUntil(this.ngUnsubscribe$),
      exhaustMap((scroll: number | null) => {
        return this.createRequest().pipe(takeUntil(this.ngUnsubscribe$));
      }))
      .subscribe((res) => {
        if (res.headers.get('x-page')) {
          this.page = +res.headers.get('x-page')! + 1;
        }
        const posts: PostInterfaceGet[] | null = res.body;
        if (posts && posts.length) {
          this.infiniteScrollService.setScrollToBottom(null);
          this.infiniteScrollService.wasOnLoadPosition = false;
          this.store.add(posts);
          if (posts.length < this.limit) {
            this.showFooter = true;
          }
        } else {
          this.showFooter = true;
        }
      });
  }

  createRequest(): Observable<HttpResponse<PostInterfaceGet[]>> {
    return this.contentType === 'userPosts' && this.userName ?
      this.getPostsForUser(this.page, this.limit, this.userName, this.searchValue) : this.getPosts(this.page, this.limit, this.sort, this.searchValue);
  }

  private search () {
    this.coreQuery.search$.subscribe((searchValue: string | undefined) => {
      this.store.reset();
      this.page = 1;
      this.searchValue = searchValue;
      this.getMorePosts();
    })
  }
}
