import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { tap } from 'rxjs/operators';
import { Core } from './core.model';
import { CoreStore } from './core.store';
import { NavigatorInterface } from '@shared/models/navigator.interface';

@Injectable({ providedIn: 'root' })
export class CoreService {

  constructor(private coreStore: CoreStore, private http: HttpClient) {
  }


  addNavigator(navigator: NavigatorInterface) {
    this.coreStore.update({navigator});
  }


}
