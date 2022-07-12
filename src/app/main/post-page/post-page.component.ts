import { Component, OnInit } from '@angular/core';
import { MainHttpService } from '@app/main/main-http.service';
import { ActivatedRoute, Params } from '@angular/router';
import { UnsubscribeAbstract } from '@shared/helpers/unsubscribe.abstract';
import { catchError, EMPTY, Observable, switchMap, takeUntil, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { PostInterfaceGet } from '@shared/models/post.interface';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: [ './post-page.component.scss' ]
})
export class PostPageComponent extends UnsubscribeAbstract implements OnInit {

  constructor (private http: MainHttpService, private route: ActivatedRoute) {
    super();
  }

  item$: Observable<PostInterfaceGet> = this.route.params.pipe(
    takeUntil(this.ngUnsubscribe$),
    catchError((err: HttpErrorResponse) => {
      return throwError(() => err);
    }),
    switchMap((params: Params) => {
      if (!params['id']) {
        return EMPTY;
      }
      return this.http.getPost(params['id']).pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(() => err);
        })
      );
    })
  );

  ngOnInit (): void {
  }

}
