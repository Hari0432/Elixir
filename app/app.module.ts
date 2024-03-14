// import { Network } from '@capacitor/network';
import { Network} from '@awesome-cordova-plugins/network/ngx'
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SQLitePorter } from '@awesome-cordova-plugins/sqlite-porter/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicStorageModule, Storage } from '@ionic/storage-angular';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { NgOtpInputModule } from  'ng-otp-input';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    ReactiveFormsModule, 
    HttpClientModule, 
    IonicStorageModule.forRoot(),
    NgOtpInputModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, SQLite, SQLitePorter,HTTP, Network],
  bootstrap: [AppComponent],
})
export class AppModule {

  constructor(private storage: Storage) {
    this.initStorage();
  }

  async initStorage() {
    await this.storage.create();
  }
}
