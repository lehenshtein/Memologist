import { Component } from '@angular/core';
import { Observable, take } from 'rxjs';
import { PostInterfaceGet } from '@shared/models/post.interface';
import { environment } from '@environment/environment';
import { MainHttpService } from '@app/main/main-http.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: [ './content.component.scss' ]
})
export class ContentComponent {
  data$: Observable<PostInterfaceGet[]> = this.http.getPosts();
  devEnv = !environment.production;

  constructor (private http: MainHttpService) {
  }

  delete (id: string) {
    this.http.deletePost(id).pipe(take(1)).subscribe();
  }
}
