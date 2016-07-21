import {Component} from '@angular/core'
import {HomePage} from '../home/home';
import {AboutPage} from '../about/about';
import {ContactPage} from '../contact/contact';
import {LegajoList} from '../legajos/legajo-list';
import {AuthService} from './../../services/auth/auth';
import {NavController} from 'ionic-angular';

import {LoginPage} from './../login/login';

@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
  ,providers: [AuthService]
})
export class TabsPage {

  private tab1Root: any;
  private tab2Root: any;
  private tab3Root: any;
  private tab4Root: any;

  constructor(private auth:AuthService, public nav:NavController) {
    this.auth = auth;
    console.log(this.auth.authenticated.getValue());
    //console.log(this.auth.isLoggedIn());

    //if (!auth.isLogin) this.nav.setRoot(LoginPage);
    
    this.tab1Root = HomePage;
    this.tab2Root = LegajoList;
    this.tab3Root = AboutPage;
    this.tab4Root = ContactPage;
  }

}
