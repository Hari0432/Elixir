import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  forgotPasswordForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
  })

  constructor(private formBuilder: FormBuilder, private route: Router) { }

  ngOnInit() {
  }

  processResetPassword() {

    this.route.navigate(['reset-password'])
    
  }
}
