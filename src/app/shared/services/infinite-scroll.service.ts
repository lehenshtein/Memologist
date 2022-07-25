import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InfiniteScrollService {
  private previousScroll: number | null = null;
  private mainScrollToBottomInPercentsSubject = new BehaviorSubject<number | null>(null);
  mainScrollToBottomInPercents$: Observable<number | null> = this.mainScrollToBottomInPercentsSubject.asObservable();
  wasOnLoadPosition = false;

  get getPreviousScroll(): number | null {
    return this.previousScroll;
  }

  set setPreviousScroll(value: number | null) {
    this.previousScroll = value;
  }

  setScrollToBottom(value: number | null) {
    this.mainScrollToBottomInPercentsSubject.next(value);
  }
  constructor() { }
}
