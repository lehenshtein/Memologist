import { Component, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';
import { LayoutTestService } from '@app/layout/layout-test.service';
import { PostInterfaceGet } from '@shared/models/post.interface';
import { environment } from '@environment/environment';
import { MatDialog } from '@angular/material/dialog';
import { ImageModalComponent } from '@shared/modals/image-modal/image-modal.component';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: [ './content.component.scss' ]
})
export class ContentComponent implements OnInit {
  data$: Observable<PostInterfaceGet[]> = this.httpTest.getTestData();
  devEnv = !environment.production;

  constructor (private httpTest: LayoutTestService, private dialog: MatDialog) {
  }

  ngOnInit (): void {
  }

  openImage (img: string) {
    console.log(img);
    this.dialog.open(ImageModalComponent, {
      data: {img},
      maxHeight: '90vh'
    });
  }

  delete (id: string) {
    this.httpTest.deletePost(id).pipe(take(1)).subscribe();
  }
}
