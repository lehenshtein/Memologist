import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { PostsService } from '@app/main/state/posts.service';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss']
})
export class SignInFormComponent implements OnInit {
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
      password: ['', [Validators.required, Validators.pattern(this.passPattern), Validators.minLength(8), Validators.maxLength(40)]]
    });
  }

  get formLogin() {
    return this.form.get('login') as FormControl;
  }
  get formPassword() {
    return this.form.get('password') as FormControl;
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
