import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { PostsService } from '@app/main/state/posts.service';
import { Router } from '@angular/router';
import { NotificationService } from '@shared/services/notification.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-create-post-form',
  templateUrl: './create-post-form.component.html',
  styleUrls: ['./create-post-form.component.scss']
})
export class CreatePostFormComponent implements OnInit {
  form!: FormGroup;
  urlPattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

  constructor(
    private fb: FormBuilder,
    private postService: PostsService,
    private router: Router,
    private notificationService: NotificationService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  // private translateMsg(): void {
  //   this.translate.stream('Messages').subscribe(() => {
  //     this.updateMessage = this.translate.instant('Messages.update');
  //   })
  // }

  private initForm() {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]],
      text: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(2000)]],
      tags: ['', Validators.maxLength(100)],
      imgUrl: [null, [Validators.pattern(this.urlPattern), Validators.maxLength(120)]]
    });
  }

  get formTitle() {
    return this.form.get('title') as FormControl;
  }
  get formText() {
    return this.form.get('text') as FormControl;
  }
  get formTags() {
    return this.form.get('tags') as FormControl;
  }
  get formImgUrl() {
    return this.form.get('imgUrl') as FormControl;
  }

  submit () {
    if (this.form.invalid) {
      return;
    }

    const formValue = this.form.getRawValue();
    const tags = formValue.tags ? formValue.tags.split(',').map((element: string) => element.trim()) : [];
    const checkedTags: string[] = [];
    tags.forEach((el: string) => {
      if (el !== '') {
        checkedTags.push(el)
      }
    })
    formValue.tags = checkedTags;

    this.postService.add(formValue, {prepend: true}).pipe(take(1)).subscribe((res: any) => {
      if(!res['message']) {
        this.form.reset();
        Object.keys(this.form.controls).forEach(key => {
          this.form.get(key)!.setErrors(null) ;
        });
        this.form.updateValueAndValidity();
        // TODO: remove form reset, after changing sidebar
        this.notificationService.openSnackBar('success',
          `${this.translate.instant('Notifications.success')} ${this.translate.instant('Notifications.created')}`);
        this.router.navigate(['/']);
      }
    })
    // this.layoutTestService.createPost(formValue).pipe(take(1)).subscribe(res => {
    //   console.log(res);
    // })
  }
}
