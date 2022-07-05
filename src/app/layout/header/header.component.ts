import {Component, EventEmitter, Input, Output} from '@angular/core';
import {environment} from '@environment/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() title: string = '';
  @Output() changeLang: EventEmitter<any> = new EventEmitter<any>();
  locales = environment.locales;
}
