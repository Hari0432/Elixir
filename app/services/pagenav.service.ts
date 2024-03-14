import { Injectable, Component } from '@angular/core';
import { CompanyPage } from '../company/company.page';
import { BranchPage } from '../branch/branch.page';
import { MenuPage } from '../menu/menu.page';

@Injectable({
  providedIn: 'root'
})
export class PagenavService {

  pages = [
    {id: 'company', component: CompanyPage},
    {id: 'menu', component: MenuPage}, 
    {id: 'branch', component: BranchPage}
  
]

  constructor() { }

}
