import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { NgOtpInputConfig } from 'ng-otp-input';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-otpverify',
  templateUrl: './otpverify.page.html',
  styleUrls: ['./otpverify.page.scss'],
})
export class OtpverifyPage implements OnInit {
  otpInputConfig: NgOtpInputConfig = {
    length: 6,
    isPasswordInput: false,
    allowNumbersOnly: true,
    inputStyles: {
      width: '40px',
      height: '40px',      
    }
  }

  loginData: any;
  deviceid: boolean = false;
  companysetup: boolean = false;
  globalsetup: boolean = false;
  branchsetup: boolean = false;
  offlinesync: boolean = false;
  otp: any;
  

  constructor(private storage: Storage, private navCtrl: NavController, private router: Router, private toastCtrl: ToastController, private loginService: LoginService) { 

    const currentNavigation = this.router.getCurrentNavigation();
    if (currentNavigation) {
      let data = currentNavigation.extras.state;
      console.log(data);
      
      if(data){

        this.loginData = data['loginData'];
        this.deviceid = data['deviceid']
        this.companysetup = data['companysetup']
        this.globalsetup = data['globalsetup']
        this.branchsetup = data['branchsetup']
        this.offlinesync = data['offlinesync']

      }
      
    }

  }

  ngOnInit() {}

//   7339001240
// P@ssw0rd

  otpValue(event: any) {
    this.otp = event
    console.log('otp event: ',this.otp);
  }

  async otpLogin(){
    
    if(this.loginData.TYPE === 'SUCCESS') {
      let Username= this.loginData.MOBILENUMBER
      let projectName = this.loginData.PROJECTNAME
      this.loginService.validateotp(this.otp, Username, projectName).subscribe((response: any)=> {
        console.log('response in otp: ',response);
        if(response.TYPE == 'SUCCESS'){
          if(this.deviceid === this.loginData.deviceId) {
            if(this.globalsetup) {
              console.log('After storage globalsetup');
              this.setNavigatePages()
            }
            else {
              this.setNavigatePages()
            }
          }
          else{
            this.ErrorMessage('Deviceid doesnot match ',2000,'bottom');
          }
        }
        else {
          this.ErrorMessage(`${response.MESSAGE}`,2000,'bottom')
        }
        
        
      })
    }        
    else {
              
      if(this.globalsetup) {
        console.log('else After storage globalsetup');

      }
      else {
        this.setNavigatePages()
      }
    }

  }

  async processResendOtp() {

    const toast = await this.toastCtrl.create({

      cssClass: 'custom-toast-class',
      message: 'OTP sent successfully!',
      duration: 3000,
      position: 'bottom',

    });

    await toast.present();

  }

  setNavigatePages() {

    if (this.companysetup) {
      this.navCtrl.navigateForward('/company');

    }
    else if (this.branchsetup) {
      this.navCtrl.navigateForward('/branch');

    }
    else if (this.offlinesync) {
      this.navCtrl.navigateForward('/sync');
    }
    else {
      this.navCtrl.navigateForward('/menu');
    }
  }

  async ErrorMessage(message: string, duration: any, position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: duration,
      position: position
    });
    toast.present();
  }

  

}
