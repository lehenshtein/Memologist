import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { PostsService } from '@app/main/state/posts.service';
import { compareValidator } from '@shared/validators/compare.validator';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss']
})
export class SignUpFormComponent implements OnInit {
  form!: FormGroup;
  passPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/;
  showPass = false;

  constructor(
    private fb: FormBuilder,
    private postService: PostsService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  showPassword() {
    this.showPass = !this.showPass;
  }

  private initForm() {
    this.form = this.fb.group({
      login: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email, Validators.minLength(8), Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.pattern(this.passPattern), Validators.minLength(8), Validators.maxLength(40)]],
      repeatPassword: ['', [Validators.required]]
    });
    this.formRepeatPassword.setValidators([Validators.required, compareValidator(this.formPassword)]);
    this.form.updateValueAndValidity();
  }

  get formLogin() {
    return this.form.get('login') as FormControl;
  }
  get formEmail() {
    return this.form.get('email') as FormControl;
  }
  get formPassword() {
    return this.form.get('password') as FormControl;
  }
  get formRepeatPassword() {
    return this.form.get('repeatPassword') as FormControl;
  }

  submit () {
    if (this.form.invalid) {
      return;
    }
    console.log(this.form.getRawValue());

    this.postService.add(this.form.getRawValue(), {prepend: true}).pipe(take(1)).subscribe((res: any) => {
      if(!res['message']) {
        // this.router.navigate(['/']);
      }
    })
    // this.layoutTestService.createPost(formValue).pipe(take(1)).subscribe(res => {
    //   console.log(res);
    // })
  }
}
