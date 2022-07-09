import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LayoutTestService } from '@app/layout/layout-test.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-create-post-form',
  templateUrl: './create-post-form.component.html',
  styleUrls: ['./create-post-form.component.scss']
})
export class CreatePostFormComponent implements OnInit {
  form!: FormGroup;
  urlPattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

  constructor(private fb: FormBuilder, private layoutTestService: LayoutTestService) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]],
      text: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(2000)]],
      tags: ['', Validators.maxLength(100)],
      imgUrl: ['', [Validators.pattern(this.urlPattern), Validators.maxLength(120)]],
      author: ['62c98cdcf9a8287650a18942', Validators.required]
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
    const tags = formValue.tags.split(',').map((element: string) => element.trim());
    const checkedTags: string[] = [];
    tags.forEach((el: string) => {
      if (el !== '') {
        checkedTags.push(el)
      }
    })
    formValue.tags = checkedTags;
    this.layoutTestService.createPost(formValue).pipe(take(1)).subscribe(res => {
      console.log(res);
    })
    console.log(formValue);
  }
}
