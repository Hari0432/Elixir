import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-sync',
  templateUrl: './sync.page.html',
  styleUrls: ['./sync.page.scss'],
})
export class SyncPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  goTo() {
    this.navCtrl.navigateForward('/menu')
  }

}
