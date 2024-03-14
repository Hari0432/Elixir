import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SingletonService } from './singleton.service';
import { throwError } from 'rxjs';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  token:any;

  constructor(private http: HttpClient, private singleton: SingletonService, private storage: Storage) {  
    this.getToken()
  }

  async getToken() {
    try {
      const tokenObject = await this.storage.get('Token');
      
      if (tokenObject) {
        this.token = tokenObject;
      } else {
        console.error('Token not found in storage or has an unexpected format.');
      }
    } catch (error) {
      console.error('Error retrieving token from storage:', error);
    }
  }


  login(sql: any, username: string, password: string, loginType: string, playerId: string) {

    let quickDetails = {

      "SQL": sql,
      "USERNAME": username,
      "PLAYERID": playerId,
      "PASSWORD": password,
      "MULTITENANT": this.singleton.ismultitenant,
      "PROJECTNAME": this.singleton.projectname

    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',

      })
    };
    if (loginType == "form") {
      return this.http.post(this.singleton.resturl + 'mobileapi/login', quickDetails, httpOptions);
    }
    else if (loginType == "otp") {
      return this.http.post(this.singleton.resturl + 'mobileapi/otplogin', quickDetails, httpOptions);
    }
    return throwError("Invalid Login Type");
  }

  validateotp(otp: any, Username: any, projectName: any) {
    let quickDetails = {
      'USEROTP': otp,
      'PROJECTNAME': projectName,
      'USERNAME': Username
    }
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':'Bearer ' + this.token
    })
    return this.http.post(this.singleton.resturl + 'mobileapi/validateotp', quickDetails, {headers: headers}); 
  }


  getCompany(userName: string, projectid: any) {
    let companyDetails = {
      "USERNAME": userName,
      "PID": projectid,
      "MLT": this.singleton.ismultitenant
    }

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':'Bearer ' + this.token
    })

    return this.http.post(this.singleton.resturl + 'mobileapi/companysync', companyDetails, { headers: headers });

  }

}
