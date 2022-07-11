import { Component, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';
import { LayoutTestService } from '@app/layout/layout-test.service';
import { PostInterfaceGet } from '@shared/models/post.interface';
import { environment } from '@environment/environment';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: [ './content.component.scss' ]
})
export class ContentComponent implements OnInit {
  data$: Observable<PostInterfaceGet[]> = this.httpTest.getTestData();
  devEnv = !environment.production;

  constructor (private httpTest: LayoutTestService) {
  }

  ngOnInit (): void {
  }

  delete (id: string) {
    this.httpTest.deletePost(id).pipe(take(1)).subscribe();
  }
}
