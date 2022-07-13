import { Component, OnInit } from '@angular/core';
import { Observable, switchMap, take, takeUntil } from 'rxjs';
import { PostInterfaceGet } from '@shared/models/post.interface';
import { environment } from '@environment/environment';
import { MainHttpService } from '@app/main/main-http.service';
import { PostsService } from '@app/main/state/posts.service';
import { PostsQuery } from '@app/main/state/posts.query';
import { UnsubscribeAbstract } from '@shared/helpers/unsubscribe.abstract';
import { ID } from '@datorama/akita';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: [ './content.component.scss' ]
})
export class ContentComponent extends UnsubscribeAbstract implements OnInit {
  data$: Observable<PostInterfaceGet[]> = this.query.getPosts().pipe(
    takeUntil(this.ngUnsubscribe$),
    switchMap((posts: PostInterfaceGet[]) => {
      if (posts && posts.length) {
        return this.query.getPosts();
      }
      return this.postsService.get<PostInterfaceGet[]>();
    })
  );

  // data$: Observable<PostInterfaceGet[]> = this.http.getPosts();
  devEnv = !environment.production;

  constructor (private http: PostsService, private postsService: PostsService, private query: PostsQuery) {
    super();
  }

  delete (id: ID) {
    this.http.delete(id).pipe(take(1)).subscribe();
  }

  ngOnInit (): void {
  }
}
