import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LayoutTestService} from '@app/layout/layout-test.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() title: string = '';
  @Output() changeLang: EventEmitter<any> = new EventEmitter<any>();
  data$: Observable<any[]> = this.httpTest.getTestData();

  constructor(private httpTest: LayoutTestService) {
  }

  ngOnInit(): void {

  }


}
