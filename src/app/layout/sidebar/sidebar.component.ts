import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CoreQuery } from '@app/core/state/core.query';
import { AuthService } from '@app/core/auth/auth.service';
import { shareReplay } from 'rxjs';
import { UserInterface } from '@shared/models/user.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: [ './sidebar.component.scss' ]
})
export class SidebarComponent implements OnInit {
  @Input() user: UserInterface | null = null;
  @Input() showNavbar: boolean = true;
  @Output() changeLang: EventEmitter<any> = new EventEmitter<any>();
  @Output() closeMenu: EventEmitter<any> = new EventEmitter<any>();
  userName$ = this.coreQuery.userName$;

  constructor (private coreQuery: CoreQuery, private authService: AuthService) {
  }

  ngOnInit (): void {
    // if (!this.coreQuery.tokenExpired) {
    //   // this.userName = this.coreQuery.userName;
    // }
  }

  logout () {
    this.authService.logout();
    window.location.reload();
  }
  objectLength(obj: {[key:string]: string}): number {
    return Object.keys(obj).length
  }
}
