import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PagenavService } from '../services/pagenav.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  data: any;
  menus: any;
  pages:any;

  constructor(private router: Router, private navCtrl: NavController, private http: HttpClient, private pageNav: PagenavService) {
    const currentNavigation = this.router.getCurrentNavigation();
    if (currentNavigation) {
      this.data = currentNavigation.extras.state;
      console.log('RecievedData: ', this.data);
    
    }
    this.pages = this.pageNav.pages
  }

  ngOnInit() {
    this.menuItems()
    console.log(this.pageNav.pages);
    
  }

  menuItems() {
    // let role = this.data['ROLE']
    this.http.get('assets/menu/USER.json').subscribe(
      (json: any) => {
        for(let object of json) {
          if(object.menu) {
            this.menus = object.menu.sort((a: any, b: any) => (a.do) - (b.do))
            console.log('Menu', this.menus)
          }
        }
      },
      (error) => {
        console.error('Error fetching JSON:', error);
      }
    );
  }

  navigateToMenuItem(view: any) {

    for(let item of this.pages) {

      if(item.id = view) {

        this.navCtrl.navigateForward([view])
      }
    }

    
  }

}
