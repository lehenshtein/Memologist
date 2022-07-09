import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() title: string = '';
  @Output() changeLang: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit(): void {

  }


}
