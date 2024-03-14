import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  resetPasswordForm: FormGroup = this.formBuilder.group({
    password: ['', [Validators.required, Validators.pattern('@ 0-9 A-Z a-z {8, 12}')]],
    confirmpassword: ['', [Validators.required, Validators.pattern('@ 0-9 A-Z a-z {8, 12}')]]
  })

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  showPassword: boolean = false;

  togglePasswordVisibility() {

    this.showPassword = !this.showPassword;

  }
  showConfirmPassword: boolean = false;

  toggleConfirmPasswordVisibility() {

    this.showConfirmPassword = !this.showConfirmPassword;

  }

  processResetPassword() {}

  submitResetPassword() {}

}
