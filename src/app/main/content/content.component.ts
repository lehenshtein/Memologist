import { Component, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';
import { PostInterfaceGet } from '@shared/models/post.interface';
import { environment } from '@environment/environment';
import { PostsService } from '@app/main/state/posts.service';
import { PostsQuery } from '@app/main/state/posts.query';
import { UnsubscribeAbstract } from '@shared/helpers/unsubscribe.abstract';
import { ID } from '@datorama/akita';
import { MetaHelper } from '@shared/helpers/meta.helper';

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

  data: PostInterfaceGet[] = this.query.getPosts;
  data$: Observable<PostInterfaceGet[]> = this.postsService.get<PostInterfaceGet[]>();

  devEnv = !environment.production;

  constructor (private http: PostsService, private postsService: PostsService, private query: PostsQuery, private metaHelper: MetaHelper) {
    super();
  }

  delete (id: ID) {
    this.http.delete(id).pipe(take(1)).subscribe();
  }

  ngOnInit (): void {
    this.updateMeta();
  }
  private updateMeta () {
    this.metaHelper.resetMeta();
  }
}
