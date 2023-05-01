import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CoreService } from '@app/core/state/core.service';
import { CoreQuery } from '@app/core/state/core.query';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() title: string = '';
  @Input() showNavbar: boolean = true;
  @Output() toggleMenu: EventEmitter<any> = new EventEmitter<any>();

  constructor(public coreQuery: CoreQuery) {
  }

  ngOnInit(): void {
  }
}
