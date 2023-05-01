import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CoreService } from '@app/core/state/core.service';
import { CoreQuery } from '@app/core/state/core.query';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Output() closeMenu: EventEmitter<any> = new EventEmitter<any>();
  constructor(private coreService: CoreService, public coreQuery: CoreQuery) { }

  ngOnInit(): void {
  }
  search (searchInput: HTMLInputElement) {
    this.coreService.setSearch(searchInput.value);
    this.closeMenu.emit();
  }
  resetSearch(searchInput: HTMLInputElement) {
    this.coreService.resetSearch();
    searchInput.value = '';
  }

}
