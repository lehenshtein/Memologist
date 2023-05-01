import { Component, Inject, Input, OnInit } from '@angular/core';
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
import { AuthService } from '@app/core/auth/auth.service';
import { NotificationService } from '@shared/services/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { DOCUMENT } from '@angular/common';
import { CoreService } from '@app/core/state/core.service';

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
  isDeviceMobile = typeof navigator.share === 'function' && this.coreQuery.navigator && this.coreQuery.navigator.mobile;

  private window!: Window;

  constructor (
    @Inject(DOCUMENT) private document: Document,
    private dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private coreQuery: CoreQuery,
    private coreService: CoreService,
    private metaHelper: MetaHelper,
    private postsService: PostsService,
    private authService: AuthService,
    private notificationService: NotificationService,
    private translate: TranslateService,
    private clipboard: Clipboard
  ) {
    super();
    if (this.document.defaultView) {
      this.window = this.document.defaultView;
    }
  }

  ngOnInit (): void {
    this.spinner.show('spinner', spinnerConfig);
    // if (!this.mainPage) {
    //   this.updateMeta();
    // }
    this.markedAs = this.item.marked || 'default';
    this.score = this.item.score;
  }

  openImage (img: string) {
    this.dialog.open(ImageModalComponent, {
      data: {img},
      maxHeight: '90vh'
    });
  }

  openShare () {
    if (!this.coreQuery.isBrowser) {
      return;
    }
    if (this.isDeviceMobile) {
      navigator.share({
        url: environment.websiteUrl + this.item._id,
        title: this.item.title,
        text: this.item.text,
      })
        .then().catch(err => console.log(err));
    }
  }

  share (social: 'telegram' | 'facebook' | 'copy') {
    if (social === 'telegram') {
      this.window.open(`https://telegram.me/share/url?url=${this.websiteUrl}${this.item._id}&amp;text=${this.item.title}`, '_blank',
        'left=100,top=50,location=yes,height=570,width=650,scrollbars=yes,status=yes');
    }
    if (social === 'facebook') {
      this.window.open(`https://www.facebook.com/sharer/sharer.php?u=${this.websiteUrl}${this.item._id}`, '_blank',
        'left=100,top=50,location=yes,height=570,width=650,scrollbars=yes,status=yes');
    }
    if (social === 'copy') {
      this.clipboard.copy(`${this.websiteUrl}${this.item._id}`);
      this.notificationService.openSnackBar('info',
        this.translate.instant('Notifications.copied'), this.translate.instant('Notifications.success'))
    }
  }

  // private updateMeta () {
  //   this.metaHelper.updateMeta({
  //     title: this.item.title,
  //     text: this.item.text,
  //     type: 'article',
  //     url: `${environment.apiUrl}/${this.item._id}`,
  //     imgUrl: this.item.imgUrl
  //   });
  // }

  toggleButtons ($event: MatButtonToggleChange) { // it needs to visualize deselecting of buttons
    let toggle = $event.source;
    if (toggle) {
      let group = toggle.buttonToggleGroup;
      if ($event.value.some((item: any) => item == toggle.value)) {
        group.value = [ toggle.value ];
      }
    }
  }

  mark (value: marks) {
    if (!this.coreQuery.isAuthenticated && !this.authService.getToken) {
      this.notificationService.openSnackBar('info', this.translate.instant('Notifications.401'));
      return;
    }
    if (this.coreQuery.tokenExpired && this.authService.getToken) {
      this.notificationService.openSnackBar('error', this.translate.instant('Notifications.token'));
      return;
    }

    if ((this.markedAs === 'default' && value === 'liked')
      || (this.markedAs === 'disliked' && value === 'disliked')
      || (this.markedAs === 'disliked' && value === 'liked')) {
      this.score++;
      this.changeMark(value);
      this.sendMarkRequest(this.item._id, 'liked');
    } else if ((this.markedAs === 'default' && value === 'disliked')
      || (this.markedAs === 'liked' && value === 'liked')
      || (this.markedAs === 'liked' && value === 'disliked')) {
      this.score--;
      this.changeMark(value);
      this.sendMarkRequest(this.item._id, 'disliked');
    }
  }

  changeMark (value: marks) {
    if (this.markedAs !== 'default') {
      this.markedAs = 'default';
    } else {
      this.markedAs = value;
    }
  }

  private sendMarkRequest (id: ID, markType: marks) {
    this.postsService.changeScore(id, markType).pipe(
      takeUntil(this.ngUnsubscribe$)).subscribe();
  }

  search (tag: string) {
    this.coreService.setSearch(tag);
  }
}
