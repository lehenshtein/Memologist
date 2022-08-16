import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { distinctUntilChanged, Observable, of, take } from 'rxjs';
import { PostsService } from '@app/main/state/posts.service';
import { Router } from '@angular/router';
import { NotificationService } from '@shared/services/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { imgPattern } from '@app/shared/helpers/regex-patterns';
import { tap } from 'rxjs/operators';
import { atLeastOneField } from '@shared/validators/at-least-one-field.validator';

@Component({
  selector: 'app-create-post-form',
  templateUrl: './create-post-form.component.html',
  styleUrls: [ './create-post-form.component.scss' ]
})
export class CreatePostFormComponent implements OnInit {
  form!: FormGroup;
  imgPattern = imgPattern;
  imgPreview: Observable<string | undefined> = of(undefined);

  constructor (
    private fb: FormBuilder,
    private postService: PostsService,
    private router: Router,
    private notificationService: NotificationService,
    private translate: TranslateService
  ) {
  }

  ngOnInit (): void {
    this.initForm();
  }

  // private translateMsg(): void {
  //   this.translate.stream('Messages').subscribe(() => {
  //     this.updateMessage = this.translate.instant('Messages.update');
  //   })
  // }

  private initForm () {
    this.form = this.fb.group({
      title: [ '', [ Validators.required, Validators.minLength(5), Validators.maxLength(50) ] ],
      text: [ '', [ Validators.minLength(10), Validators.maxLength(2000) ] ],
      tags: [ '', Validators.maxLength(100) ],
      imgUrl: [ null, [ Validators.pattern(this.imgPattern), Validators.maxLength(240) ] ]
    });

    this.form.setValidators(atLeastOneField(this.formText, this.formImgUrl));

    this.showImgPreview();
  }

  get formTitle () {
    return this.form.get('title') as FormControl;
  }

  get formText () {
    return this.form.get('text') as FormControl;
  }

  get formTags () {
    return this.form.get('tags') as FormControl;
  }

  get formImgUrl () {
    return this.form.get('imgUrl') as FormControl;
  }

  private showImgPreview () {
    this.imgPreview = this.formImgUrl.valueChanges.pipe(tap(() => {
      this.removeFormControlError(this.formImgUrl, 'wrongImageLink')
    }), distinctUntilChanged());

  }

  removeFormControlError(control: AbstractControl, errorName: string) {
    if (control?.errors && control?.errors[errorName]) {
      delete control.errors[errorName];
      if (Object.keys(control.errors).length === 0) {
        control.setErrors(null);
      }
    }
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
        checkedTags.push(el);
      }
    });
    formValue.tags = checkedTags;

    this.postService.add(formValue, {prepend: true}).pipe(take(1)).subscribe((res: any) => {
      if (!res['message']) {
        this.form.reset();
        Object.keys(this.form.controls).forEach(key => {
          this.form.get(key)!.setErrors(null);
        });
        this.form.updateValueAndValidity();
        // TODO: remove form reset, after changing sidebar
        this.notificationService.openSnackBar('success',
          `${this.translate.instant('Notifications.success')} ${this.translate.instant('Notifications.created')}`);
        this.router.navigate([ '/' ]);
      }
    });
    // this.layoutTestService.createPost(formValue).pipe(take(1)).subscribe(res => {
    //   console.log(res);
    // })
  }

  imageError (err: ErrorEvent) {
    if (err) {
      this.formImgUrl.setErrors({wrongImageLink: true});
    }
  }
}
