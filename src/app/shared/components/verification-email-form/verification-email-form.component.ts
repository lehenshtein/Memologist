import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-verification-email-form',
  templateUrl: './verification-email-form.component.html',
  styleUrls: ['./verification-email-form.component.scss']
})
export class VerificationEmailFormComponent implements OnInit {
  @Input() verificationCode: string | undefined = undefined;
  @Output() onSubmit = new EventEmitter<{ verificationCode: string }>();
  form!: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.form = this.fb.group({
      verificationCode: [this.verificationCode ? this.verificationCode : '',
        [Validators.required, Validators.minLength(8), Validators.maxLength(8)]]
    });
    this.submit();
  }

  get formVerificationCode() {
    return this.form.get('verificationCode') as FormControl;
  }

  submit () {
    if (this.form.invalid) {
      return;
    }
    this.onSubmit.emit(this.form.getRawValue());
  }
}
