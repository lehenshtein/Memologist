import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { compareValidator } from '@shared/validators/compare.validator';
import { UserRegisterInterface } from '@shared/models/user.interface';
import { passPattern } from '@app/shared/helpers/regex-patterns';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['../auth-forms-styles.scss']
})
export class SignUpFormComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<UserRegisterInterface>();
  form!: FormGroup;
  passPattern = passPattern;
  showPass = false;

  constructor(
    private fb: FormBuilder
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
    const form = this.form.getRawValue();
    const authData = {
      name: form.login,
      email: form.email,
      password: form.password
    }
    this.onSubmit.emit(authData);

    // this.postService.add(this.form.getRawValue(), {prepend: true}).pipe(take(1)).subscribe((res: any) => {
    //   if(!res['message']) {
    //     // this.router.navigate(['/']);
    //   }
    // })
    // this.layoutTestService.createPost(formValue).pipe(take(1)).subscribe(res => {
    //   console.log(res);
    // })
  }
}
