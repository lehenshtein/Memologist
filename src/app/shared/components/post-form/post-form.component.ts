import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize, Observable, of, take } from 'rxjs';
import { PostsService } from '@app/main/state/posts.service';
import { Router } from '@angular/router';
import { NotificationService } from '@shared/services/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { imgPattern } from '@app/shared/helpers/regex-patterns';
import { contentType } from '@shared/models/post.interface';
import { MaxSizeValidator } from '@angular-material-components/file-input';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: [ './post-form.component.scss' ]
})
export class PostFormComponent implements OnInit {
  form!: FormGroup;
  imgPattern = imgPattern;
  imgPreview: Observable<string | undefined> = of(undefined);
  loading = false;
  maxImgSize = 2;

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
      tags: [ '', Validators.maxLength(100) ],
      content: this.fb.array([])
    });
  }

  get formTitle () {
    return this.form.get('title') as FormControl;
  }

  get formTags () {
    return this.form.get('tags') as FormControl;
  }

  get getFormContent (): FormArray {
    return this.form.get('content') as FormArray;
  }

  getFormContentItem (index: number) {
    return this.getFormContent.controls[index];
  }

  getFormContentText (index: number) {
    return this.getFormContent.controls[index].get('text');
  }

  getFormContentImgUrl (index: number) {
    return this.getFormContent.controls[index].get('imgUrl');
  }

  getFormContentImg (index: number) {
    return this.getFormContent.controls[index].get('file');
  }

  get contentTextGroup (): FormGroup {
    return this.fb.group({
      type: [ 'text' ],
      text: [ '', [ Validators.minLength(10), Validators.maxLength(2000) ] ]
    });
  }

  get contentImgGroup (): FormGroup {
    return this.fb.group({
      type: [ 'imgName' ],
      file: [ null, [MaxSizeValidator(this.maxImgSize * 1048576)] ]
    });
  }

  get contentImgUrlGroup (): FormGroup {
    return this.fb.group({
      type: [ 'imgUrl' ],
      imgUrl: [ null, [ Validators.pattern(this.imgPattern), Validators.maxLength(240) ] ]
    });
  }


  addText () {
    this.getFormContent.push(this.contentTextGroup);
  }

  addImg () {
    this.getFormContent.push(this.contentImgGroup);
  }

  addImgUrl () {
    this.getFormContent.push(this.contentImgUrlGroup);
  }

  removeContent (i: number) {
    this.getFormContent.removeAt(i);
  }

  removeFormControlError (control: AbstractControl, errorName: string) {
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

    this.loading = true;

    const formValue = this.form.getRawValue();
    const formData = new FormData();
    const tags = formValue.tags ? formValue.tags.split(',').map((element: string) => element.trim()) : [];
    const checkedTags: string[] = [];
    tags.forEach((el: string) => {
      if (el !== '') {
        checkedTags.push(el);
      }
    });
    formValue.tags = checkedTags;


    formData.append('title', formValue.title);
    formData.append('tags', JSON.stringify(formValue.tags));
    formValue.content.forEach((el: { type: contentType, file?: File, imgName?: string, imgUrl?: string, text?: string }) => {
      if (el.type === 'imgName' && el.file) {
        formData.append('images', el.file, el.file.name);
      }
    });
    formValue.content = formValue.content.map((el: { type: contentType, file?: File, imgName?: string }) => {
      if (el.type === 'imgName' && el.file) {
        // formData.append(el.file.name, el.file);
        return {type: 'imgName', imgName: el.file.name};
      }
      return el;
    });
    formData.append('content', JSON.stringify(formValue.content));
    formData.forEach(el => console.log(el));
    console.log(formValue);


    this.postService.createPost(formData).pipe(take(1), finalize(() => this.loading = false))
      .subscribe((res: any) => {
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

  imageError (err: ErrorEvent, i: number) {
    if (err) {
      this.getFormContentImgUrl(i)?.setErrors({wrongImageLink: true});
      this.form.updateValueAndValidity();
    }
  }

  logger (value: any) {
    console.log(value);
  }
}
