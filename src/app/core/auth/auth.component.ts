import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

export type authPagesTypes = 'sign-in' | 'sign-up';

@Component({
  selector: 'app-sign-in.main-content-size',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  page: authPagesTypes = 'sign-in';
  constructor(private route: ActivatedRoute ) {
    this.route.routeConfig?.path === 'sign-up' ? this.page = 'sign-up' : this.page = 'sign-in';
  }

  ngOnInit(): void {

  }

}
