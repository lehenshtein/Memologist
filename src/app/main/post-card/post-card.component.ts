import { Component, Input, OnInit } from '@angular/core';
import { PostInterfaceGet } from '@shared/models/post.interface';
import { ImageModalComponent } from '@shared/modals/image-modal/image-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { spinnerConfig } from '@shared/helpers/spinner-config';
import { environment } from '@environment/environment';
import { CoreQuery } from '@app/core/state/core.query';
import { MetaHelper } from '@shared/helpers/meta.helper';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: [ './post-card.component.scss' ]
})
export class PostCardComponent implements OnInit {
  @Input() item!: PostInterfaceGet;
  @Input() mainPage = true;
  websiteUrl = environment.websiteUrl;


  constructor (private dialog: MatDialog, private spinner: NgxSpinnerService, private coreQuery: CoreQuery, private metaHelper: MetaHelper) {
  }

  ngOnInit (): void {
    this.spinner.show('spinner', spinnerConfig);
    if (!this.mainPage) {
      this.updateMeta();
    }
  }

  openImage (img: string) {
    this.dialog.open(ImageModalComponent, {
      data: {img},
      maxHeight: '90vh'
    });
  }

  share (social: 'telegram') {
    if (typeof navigator.share === 'function' && this.coreQuery.navigator && this.coreQuery.navigator.mobile) {
      navigator.share({
        url: environment.websiteUrl + this.item._id,
        title: this.item.title,
        text: this.item.text,
      })
        .then().catch(err => console.log(err))
    } else {
      if (social === 'telegram') {
        window.open(`https://telegram.me/share/url?url=${this.websiteUrl}${this.item._id}&amp;text=${this.item.title}`,'_blank');
      }
    }
  }

  private updateMeta () {
    this.metaHelper.updateMeta({
      title: this.item.title,
      text: this.item.text,
      type: 'article',
      url: `${environment.apiUrl}/${this.item._id}`,
      imgUrl: this.item.imgUrl
    });
  }
}
