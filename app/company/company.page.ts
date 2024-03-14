import { SingletonService } from './../services/singleton.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { Observable } from 'rxjs';
import { InputCustomEvent, NavController, ToastController, ViewDidEnter } from '@ionic/angular';

interface OPTIONJSON {
  COMPANYNAME: string,
  COMPANYID: any

}
@Component({
  selector: 'app-company',
  templateUrl: './company.page.html',
  styleUrls: ['./company.page.scss'],
})
export class CompanyPage implements OnInit, ViewDidEnter {

  UserDetails:any;
  optionJson:any[] = [];
  selectedCompanyIndex: number = -1;
  searchFilteredCompanies: OPTIONJSON[] = []
  searchPrompt = ''
  syncMaster: any

  constructor(private router: Router, private loginService: LoginService, private singleton: SingletonService, private navCtrl: NavController, private toastCtrl: ToastController) {

    const currentNavigation = this.router.getCurrentNavigation();
    if (currentNavigation) {
      let data = currentNavigation.extras.state;
      console.log('RecievedData: ',data);
      if(data) {
        this.UserDetails=data['logindata'];
        this.syncMaster= data['syncMaster']
        console.log('user: ',this.UserDetails);
        
      }
   
    }
  }

  ngOnInit() {
  }

  ionViewDidEnter(){
    
   let username=this.UserDetails['USERNAME'];
    
     this.loginService.getCompany(username, this.singleton.PID).subscribe((response)=> {
        
        this.optionJson = (response as any).data; 

     });   

    
  }

  toggleSelectCompany(index: number) {

    if (this.selectedCompanyIndex === index) {
      this.selectedCompanyIndex = -1;
      
      
    } else {
      this.selectedCompanyIndex = index;

    }  

    this.UserDetails['COMPANY'] = this.optionJson[index].COMPANYNAME
    
    this.UserDetails['COMPANYNAME'] = this.optionJson[index].COMPANYNAME


  } 

  updateSearchPrompt(event: InputCustomEvent ) {

    const searchPrompt = event.detail.value!;    

    this.searchPrompt = searchPrompt;

    this.searchFilteredCompanies = this.optionJson.filter(company => {
      return company.COMPANYNAME.toLowerCase().includes(searchPrompt.toLowerCase());
    })

  }

  submitSelection() {  

    // console.log("this.UserDetails['COMPANY']",this.UserDetails['COMPANY']); 
    
    if(this.selectedCompanyIndex > -1) {
      if(this.syncMaster) {
        console.log('Company selection success');
    
        this.navCtrl.navigateForward('/menu', {state: this.UserDetails})
      }
      else {
        this.ErrorMessage('Cannot sync', 3000, 'bottom')
      }
      
    }
    else {
      this.ErrorMessage('Please select a company!', 2000, 'bottom')
      console.log('Please select company');
      
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
