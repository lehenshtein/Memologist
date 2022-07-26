// import { Injectable } from '@angular/core';
// import {
//   Router, Resolve,
//   RouterStateSnapshot,
//   ActivatedRouteSnapshot, Params
// } from '@angular/router';
// import { EMPTY, Observable, of, switchMap } from 'rxjs';
// import { PostsQuery } from '@app/main/state/posts.query';
// import { PostsService } from '@app/main/state/posts.service';
// import { PostInterfaceGet } from '@shared/models/post.interface';
// import { environment } from '@environment/environment';
// import { MetaHelper } from '@shared/helpers/meta.helper';
// import { tap } from 'rxjs/operators';
//
// @Injectable({
//   providedIn: 'root'
// })
// export class PostResolver implements Resolve<PostInterfaceGet | undefined> {
//   constructor (private query: PostsQuery, private postsService: PostsService, private metaHelper: MetaHelper) {
//
//   }
//   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PostInterfaceGet | undefined> {
//     const id = route.params['id'];
//     if (this.query.getPost(id)) { // check if post exists in store
//       const post: PostInterfaceGet = this.query.getPost(id) as PostInterfaceGet;
//       this.updateMeta(post);
//       return of(post);
//     }
//     return this.postsService.get<PostInterfaceGet>(id, {skipWrite: true}).pipe(tap((res: PostInterfaceGet) => {
//       this.updateMeta(res);
//     }));
//   }
//
//   private updateMeta (item: PostInterfaceGet) {
//     this.metaHelper.updateMeta({
//       title: item.title,
//       text: item.text,
//       type: 'article',
//       url: `${environment.apiUrl}/${item._id}`,
//       imgUrl: item.imgUrl
//     });
//   }
// }
