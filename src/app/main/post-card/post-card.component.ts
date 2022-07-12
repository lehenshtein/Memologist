import { Component, Input, OnInit } from '@angular/core';
import { PostInterfaceGet } from '@shared/models/post.interface';
import { ImageModalComponent } from '@shared/modals/image-modal/image-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { spinnerConfig } from '@shared/helpers/spinner-config';
import { environment } from '@environment/environment';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: [ './post-card.component.scss' ]
})
export class PostCardComponent implements OnInit {
  @Input() item!: PostInterfaceGet;
  websiteUrl = environment.websiteUrl;

  constructor (private dialog: MatDialog, private spinner: NgxSpinnerService) {
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
    if (social === 'telegram') {
      window.open(`https://telegram.me/share/url?url=${this.websiteUrl}${this.item._id}&amp;text=${this.item.title}`,'_blank');
    }
  }
}
