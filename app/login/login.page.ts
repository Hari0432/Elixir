import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { HttpClient } from '@angular/common/http';
import { SQLitePorter } from '@awesome-cordova-plugins/sqlite-porter/ngx';
import { Device } from '@capacitor/device';
import { Storage } from '@ionic/storage-angular';
import { SingletonService } from '../services/singleton.service';
import { LoginService } from '../services/login.service';
import { Connection } from '@awesome-cordova-plugins/network/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginWithEmailForm: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern('(?=.*)(?=.*[a-z])(?=.*[A-Z]).{8,}')]],
    rememberme: [false]
  });

  sqlString: any;
  database: any;
  showLoginPassword: boolean = false;
  companysetup: boolean = false;
  globalsetup: boolean = false;
  branchsetup: boolean = false;
  offlinesync: boolean = false;
  deviceBased: boolean = false;
  forgetpassword: boolean = false;
  deviceid: boolean = false;
  networks: boolean = false;
  UserDetails: any;
  playerId: any;
  deviceId: any;
  db!: SQLiteObject;

  constructor(
    private route: Router,
    private navCtrl: NavController,
    public formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private sqlite: SQLite,
    private http: HttpClient,
    private sqlitePorter: SQLitePorter,
    private storage: Storage,
    private singleton: SingletonService,
    private loginService: LoginService

  ) {
    this.copydb();

    
    this.checkConnection()

    const logDeviceInfo = async () => {
      const deviceInfo = await Device.getId();

      this.deviceId = deviceInfo.identifier
      console.log('Device info: ', this.deviceId);
    };
    logDeviceInfo()

  }
 

  ngOnInit() {
    
  }

  checkConnection() {
    var networkState = (navigator as any).connection.type;
  
    console.log('Connection type: ',networkState);

    if(networkState == 'wifi' || networkState == '4g'  || networkState == '3g' || networkState == '2g'){
      this.networks = true 
      console.log('lognetwork: ',this.networks);
      
    }
    else {
      this.ErrorMessage('Your internet is very slow', 3000, 'bottom');
      console.log('No internet');
      
    }
  }

  loginWithPhone() {
    this.navCtrl.navigateForward('/login-with-phone')
  }

  toggleLoginPasswordVisibility() {
    this.showLoginPassword = !this.showLoginPassword;
  }

  async login(event: any) {

    let pid: any;
    let sql: any;
    let params: any;
    let loginType: any;
    let idArray: any[] = [];
    let paramsValues: { [key: string]: any } = {};

    sql = event.currentTarget.dataset.sql;
    loginType = event.currentTarget.dataset.type;
    params = event.currentTarget.dataset.params;

    const splitParams = params.split(',').map((item: string) => item.trim());

    for (let i = 0; i < splitParams.length; i++) {
      let id = 'login_' + splitParams[i].toLowerCase() + '_id';
      idArray.push(id);

    }

    for (let j = 0; j < splitParams.length; j++) {

      if ((document.getElementById(idArray[j]) as HTMLInputElement).value != null) {
        paramsValues[splitParams[j]] = (document.getElementById(idArray[j]) as HTMLInputElement).value;

      }

      else {

        alert("Please Enter User Details");
        return;
      }

    }

    await Promise.all([

      this.executeSql('select * from mcontrol where key=?', ['companysetup']),
      this.executeSql('select * from mcontrol where key=?', ['globalsetup']),
      this.executeSql('select * from mcontrol where key=?', ['offlinesync']),
      this.executeSql('select * from mcontrol where key=?', ['forgetpassword']),

    ]).then((result) => {
      let value1: any, value2: any, value3: any, value4: any;

      for (let i = 0; i < result[0].rows.length; i++) {
        value1 = result[0].rows.item(i)
        this.companysetup = value1.value;
      }

      for (let i = 0; i < result[1].rows.length; i++) {
        value2 = result[1].rows.item(i)
        this.globalsetup = value2.value;
      }

      for (let i = 0; i < result[2].rows.length; i++) {
        value3 = result[2].rows.item(i)
        this.offlinesync = value3.value;
      }

      for (let i = 0; i < result[3].rows.length; i++) {
        value4 = result[3].rows.item(i)
        this.forgetpassword = value4.value;
      }

    });

    let username = paramsValues['USERNAME']; //8667449894
    let password = paramsValues['PASSWORD']; //P@ssw0rd
    this.playerId = 'playerId';

    if (this.networks) {
      this.loginService.login(sql, username, password, loginType, this.playerId).subscribe((response: any) => {
        console.log('api response', response);
        let loginData = response;

        if (loginType === 'form') {
          if(loginData.TYPE === 'SUCCESS') {
            if(loginData.ENABLE_MOBILE == 'T') {
              this.storage.set('userObj',loginData);
              this.storage.set('Token', loginData.AUTHKEY);
              
              if(!this.deviceid){
                if(this.deviceId != loginData.deviceId) {               
                  if(!this.globalsetup) {
                    console.log('After storage globalsetup');
                    
                  }
                  else {
                    this.setNavigatePages(loginData)
                  }
                }else{
                  this.ErrorMessage('Deviceid doesnot match ',2000,'bottom');
                }

              }           
              else {
                
                if(this.globalsetup) {
                  console.log('else After storage globalsetup');

                }
                else {
                  this.setNavigatePages(loginData)
                }
              }
            }
            else {
             
              this.ErrorMessage('Your Mobile Number not Active, Please contact Admin',2000,'bottom');
              
            }
          } 
          else {
            this.ErrorMessage(`${loginData.message}`,2000,'bottom');
          }
          
        }
        else if(loginType = 'otp') {

          if(loginData.TYPE === 'SUCCESS') {
            const dataToSend = {
              loginData: loginData,
              globalsetup: this.globalsetup,
              offlinesync: this.offlinesync,
              companysetup: this.companysetup,
              branchsetup: this.branchsetup,
              deviceid: this.deviceid
            };    
            this.navCtrl.navigateForward(['/login-otp-verify'], {state: dataToSend});
          }
          else {
            this.ErrorMessage(`${loginData.message}`,2000,'bottom');
          }
        }
      });

    } else {



      // try {
      //   const result = await this.db.executeSql('SELECT userid AS \"muserid\", username AS \"first_name\",lastname AS "\lastname\", mobilenumber AS "\mobile_number\",mobilenumber, emailid AS \"email_id\", enabled  AS \"is_active\", rolename AS \"role\", enable_mobile AS \"enable_mobile\" ,projectid AS \"projectid\" FROM euser WHERE username=? AND password=?', [username, password]);

      //   if (result.rows.length > 0) {
      //     const data = result.rows.item(0);
      //     console.log('value4: ', data);
      //     this.setUserDetails(data);

      //     this.storage.set('userObj', data);

      //     if (this.deviceBased) {
      //       if (data.app_device_id == this.deviceId) {
      //         console.log('device-id: ', this.deviceId);

      //         console.log('Successfully loged in');
      //         this.setNavigatePages();
      //       }
      //       else {
      //         console.log('This device is not registered with the database');
      //       }

      //     }
      //     else {
      //       this.setNavigatePages();
      //     }

      //   } else {
      //     console.log('User not found');
      //   }
      // } catch (error) {
      //   console.error('Error executing SQL:', error);
      // }
    }



  }

  executeSql(query: string, params: any[]): Promise<any> {
    return this.db.executeSql(query, params);
  }

  copydb() {

    this.http.get('assets/db.sql', { responseType: 'text' }).subscribe((data: any) => {
      this.sqlString = data;
      this.sqlite.create({ name: 'data.db', location: 'default' }).then((db: SQLiteObject) => {
        this.database = db;
        this.dbimporter();
        this.db = db;
      }).catch((error: any) => {
      })
    });

  }

  dbimporter() {

    this.sqlitePorter.importSqlToDb(this.database, this.sqlString).then(() => {
      console.log('SQL imported successfully');
    }).catch((error: any) => {
      if (error.message.includes("already exists")) {
        console.log('Database already imported')
      }
      else {
        console.log('Database Creation error')
      }
    })
  }

  forgotPassword() {

    this.alertCtrl.create({
      header: "Forgot Password?",
      subHeader: "Are you sure want to reset your password.",
      buttons: [
        {
          text: "Cancel",
          role: 'cancel',
          handler: () => {
            console.log("Cancel clicked");
          }
        },

        {
          text: "Reset",
          handler: () => {
            this.route.navigate(['/forgot-password'])
          }
        }
      ]
    }).then(alert => alert.present())

  }

  setUserDetails(data: any) {

    // this.UserDetails['FIRSTNAME']=data.firstName;
  }

  setGlobal() {
    console.log('This is from setglobal method');
    
  }

  setNavigatePages(loginData: any) {

    if (this.companysetup) {
      this.navCtrl.navigateForward('/company',{state: loginData});

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
