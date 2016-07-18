import {Page, NavController, NavParams} from 'ionic-angular';
import {Legajo} from './../legajos/legajo-list';
/*
  Generated class for the LegajoDetallePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/legajo-detalle/legajo-detalle.html',
})
export class LegajoDetallePage {
  legajo: Legajo;
  constructor(public nav: NavController, params: NavParams) {
    this.legajo = params.get('legajo');
  }
}