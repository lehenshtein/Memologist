import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CoreQuery } from '@app/core/state/core.query';
import { AuthService } from '@app/core/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: [ './sidebar.component.scss' ]
})
export class SidebarComponent implements OnInit {
  @Output() changeLang: EventEmitter<any> = new EventEmitter<any>();
  @Output() closeMenu: EventEmitter<any> = new EventEmitter<any>();
  // userName: string | null = null;
  userName$ = this.coreQuery.userName$;

  constructor (private coreQuery: CoreQuery, private authService: AuthService) {
  }

  ngOnInit (): void {
    if (!this.coreQuery.tokenExpired) {
      // this.userName = this.coreQuery.userName;
    }
  }

  logout () {
    this.authService.logout();
  }
}
