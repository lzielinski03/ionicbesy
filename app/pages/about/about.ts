import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {HeaderComponent} from './../components/header/header';

@Component({
  templateUrl: 'build/pages/about/about.html',
  directives: [HeaderComponent]
})
export class AboutPage {
  constructor(private navController: NavController) {
  }
}
