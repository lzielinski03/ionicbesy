import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {HeaderComponent} from './../components/header/header';

@Component({
  templateUrl: 'build/pages/home/home.html',
  directives: [HeaderComponent]
})
export class HomePage {
  constructor() {
  
  }
}
