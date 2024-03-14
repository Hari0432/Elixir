import { Injectable } from '@angular/core';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
// import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SingletonService {

  public PID = "";
  public userid = ""; 
  public resturl = "http://192.168.125.76:3383/mservice/";  
  public dynamicresturl = "";
  public projectname = "auvitppcorav470";  
  public ismultitenant = "True";
  public table_underscore = "False";
  public imei_based_login = "False";
  public role = "";
  public apikey = "";
  public senderid = "";
  public googleapikey = "";
  public googleclientid = "";
  public tracking = "false";
  public trackInterval = "";
  public weatherapiKey = "";

  constructor(private http: HTTP) {
    console.log('Hello Singleton Service');
     }
}
