import { Component, Input, OnInit } from '@angular/core';
import { marks, PostInterfaceGet } from '@shared/models/post.interface';
import { ImageModalComponent } from '@shared/modals/image-modal/image-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { spinnerConfig } from '@shared/helpers/spinner-config';
import { environment } from '@environment/environment';
import { CoreQuery } from '@app/core/state/core.query';
import { MetaHelper } from '@shared/helpers/meta.helper';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { PostsService } from '@app/main/state/posts.service';
import { ID } from '@datorama/akita';
import { takeUntil } from 'rxjs';
import { UnsubscribeAbstract } from '@shared/helpers/unsubscribe.abstract';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: [ './post-card.component.scss' ]
})
export class PostCardComponent extends UnsubscribeAbstract implements OnInit {
  @Input() item!: PostInterfaceGet;
  @Input() mainPage = true;
  websiteUrl = environment.websiteUrl;
  markedAs: marks = 'default';
  score: number = 1;


  constructor (
    private dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private coreQuery: CoreQuery,
    private metaHelper: MetaHelper,
    private postsService: PostsService
  ) {
    super();
  }

  ngOnInit (): void {
    this.spinner.show('spinner', spinnerConfig);
    if (!this.mainPage) {
      this.updateMeta();
    }
    this.markedAs = this.item.marked || 'default';
    this.score = this.item.score;
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

  toggleButtons ($event: MatButtonToggleChange ) { // it needs to visualize deselecting of buttons
    let toggle = $event.source;
    if (toggle) {
      let group = toggle.buttonToggleGroup;
      if ($event.value.some((item: any) => item == toggle.value)) {
        group.value = [toggle.value];
      }
    }
  }

  mark(value: marks) {
    if (!this.coreQuery.isAuthenticated) {
      return;
    }
    if ((this.markedAs === 'default' && value === 'liked')
      || (this.markedAs === 'disliked' && value === 'disliked')
      || (this.markedAs === 'disliked' && value === 'liked')) {
      this.score++;
      this.changeMark(value);
      this.sendMarkRequest(this.item._id, 'liked');
    }
    else if ((this.markedAs === 'default' && value === 'disliked')
      || (this.markedAs === 'liked' && value === 'liked')
      || (this.markedAs === 'liked' && value === 'disliked')) {
      this.score--;
      this.changeMark(value);
      this.sendMarkRequest(this.item._id, 'disliked')
    }
  }
  changeMark(value: marks) {
    if (this.markedAs !== 'default') {
      this.markedAs = 'default';
    } else {
      this.markedAs = value;
    }
  }
  private sendMarkRequest(id: ID, markType: marks) {
    this.postsService.changeScore(id, markType).pipe(
      takeUntil(this.ngUnsubscribe$)).subscribe();
  }
}
