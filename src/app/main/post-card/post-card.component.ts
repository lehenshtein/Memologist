import { Component, Input, OnInit } from '@angular/core';
import { PostInterfaceGet } from '@shared/models/post.interface';
import { ImageModalComponent } from '@shared/modals/image-modal/image-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { spinnerConfig } from '@shared/helpers/spinner-config';
import { environment } from '@environment/environment';
import { CoreQuery } from '@app/core/state/core.query';
import { NavigatorInterface } from '@shared/models/navigator.interface';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: [ './post-card.component.scss' ]
})
export class PostCardComponent implements OnInit {
  @Input() item!: PostInterfaceGet;
  @Input() clickable = true;
  websiteUrl = environment.websiteUrl;


  constructor (private dialog: MatDialog, private spinner: NgxSpinnerService, private coreQuery: CoreQuery) {
  }

  ngOnInit (): void {
    this.spinner.show('spinner', spinnerConfig);
  }

  openImage (img: string) {
    this.dialog.open(ImageModalComponent, {
      data: {img},
      maxHeight: '90vh'
    });
  }

  share (social: 'telegram') {
    console.log(this.coreQuery.navigator);
    this.coreQuery.navigator$.subscribe(res => {
      console.log('Observable', res);
    })
    console.log(typeof navigator.share);
    if (typeof navigator.share === 'function' && this.coreQuery.navigator && this.coreQuery.navigator.mobile) {
      navigator.share({
        url: environment.websiteUrl + this.item._id,
        title: this.item.title,
        text: this.item.text,
      })
        .then(res => console.log(res));
    }

    if (social === 'telegram') {
      window.open(`https://telegram.me/share/url?url=${this.websiteUrl}${this.item._id}&amp;text=${this.item.title}`,'_blank');
    }
  }
}
