import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {HeaderComponent} from './../components/header/header';

@Component({
  templateUrl: 'build/pages/contact/contact.html',
  directives: [HeaderComponent]
})
export class ContactPage {
  constructor(private navController: NavController) {
  }
}
