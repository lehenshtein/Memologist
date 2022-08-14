import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserInterface } from '@shared/models/user.interface';
import { UserHttpService } from '@app/user-page/user-http.service';
import { Observable, of } from 'rxjs';
import { PostInterfaceGet } from '@shared/models/post.interface';

@Component({
  selector: 'app-user-page.main-content-size',
  templateUrl: './user-page.component.html',
  styleUrls: [ './user-page.component.scss' ]
})
export class UserPageComponent implements OnInit {
  username: string = '';
  user$: Observable<UserInterface | null> = of(null);
  userPosts: PostInterfaceGet[] = [];

  constructor (private route: ActivatedRoute, private userHttp: UserHttpService) {
    this.username = this.route.snapshot.params['username'];
    console.log(this.username);
  }

  ngOnInit (): void {
    if (this.username) {
      this.user$ = this.userHttp.getUserByName(this.username);
      // this.getUserPosts();
    }

  }

  // getUserPosts() {
  //   this.userHttp.getUserPosts(this.username).subscribe(res => {
  //     this.userPosts = res;
  //     console.log(res);
  //   })
  // }

  objectLength (obj: { [key: string]: string }): number {
    return Object.keys(obj).length;
  }

}
