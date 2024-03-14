import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login-landing',
  templateUrl: './login-landing.page.html',
  styleUrls: ['./login-landing.page.scss'],
})
export class LoginLandingPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  loginWithEmail() {

    this.navCtrl.navigateForward('/login');

  }

  loginWithPhone() {

    this.navCtrl.navigateForward('/otplogin')

  }

}
