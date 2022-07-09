import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LayoutTestService } from '@app/layout/layout-test.service';
import { PostInterfaceGet } from '@shared/models/post.interface';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  data$: Observable<PostInterfaceGet[]> = this.httpTest.getTestData();

  constructor(private httpTest: LayoutTestService) { }

  ngOnInit(): void {
  }

}
