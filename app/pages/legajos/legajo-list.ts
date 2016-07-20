import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
//import {FORM_DIRECTIVES, FormBuilder,  ControlGroup, Validators, AbstractControl} from '@angular/common';
import {Http, Headers, HTTP_BINDINGS} from '@angular/http';
//import {AuthService} from './../../services/auth/auth';
//import {AuthHttp, AuthConfig, JwtHelper} from 'angular2-jwt';

//import 'rxjs/add/operator/map';

import {HeaderComponent} from './../components/header/header';

import {LegajoDetallePage} from './../legajo-detalle/legajo-detalle';

@Component({
	templateUrl: 'build/pages/legajos/legajo-list.html',
  directives: [HeaderComponent]
})

export class LegajoList {
    INSTANCES_URL: string = "http://localhost:8090/instances";
    contentHeader : Headers = new Headers();
    legajos: Legajo[];
    
      // provide Angular with metadata about things it should inject in the constructor
    static get parameters() {
        return [[NavController], [NavParams]];
    }

    constructor(public nav: NavController, public navParams: NavParams, public http: Http) {
        this.contentHeader.append('Access-Control-Allow-Origin','*');
        this.contentHeader.append('Access-Control-Allow-Methods' , 'POST, GET, OPTIONS, PUT');
        this.contentHeader.append('Content-Type' , 'application/json');
        this.contentHeader.append('Accept', 'application/json');

        this.nav = nav;

        /*
        var response = http.get('http://localhost:8090/instances')
          .map(res => res.json())
          .subscribe(
            data => {
              this.legajos = [data, data, data];
              console.log(this.legajos)
            },
            () => console.log('Complete!')
          );
        console.log(response);
           */ 
        var x: Legajo[] = [
          { "id": 1, "description": "Leagajo", "total": 150000 , "banks":[{"name":"Banco de Santa Cruz", "money": 50000},{"name":"Banco de San Juan", "money": 25000}] },
          { "id": 2, "description": "Leagajo", "total": 150000 , "banks":[{"name":"Banco de Santa Cruz", "money": 50000},{"name":"Banco de San Juan", "money": 25000}]},
          { "id": 3, "description": "Leagajo", "total": 150000 , "banks":[{"name":"Banco de Santa Cruz", "money": 50000},{"name":"Banco de San Juan", "money": 25000}]},
          { "id": 4, "description": "Leagajo", "total": 150000 , "banks":[{"name":"Banco de Santa Cruz", "money": 50000},{"name":"Banco de San Juan", "money": 25000}]},
          { "id": 5, "description": "Leagajo", "total": 150000 , "banks":[{"name":"Banco de Santa Cruz", "money": 50000},{"name":"Banco de San Juan", "money": 25000}]},
          { "id": 6, "description": "Leagajo", "total": 150000 , "banks":[{"name":"Banco de Santa Cruz", "money": 50000},{"name":"Banco de San Juan", "money": 25000}]},
          { "id": 7, "description": "Leagajo", "total": 150000 , "banks":[{"name":"Banco de Santa Cruz", "money": 50000},{"name":"Banco de San Juan", "money": 25000}]},
          { "id": 8, "description": "Leagajo", "total": 150000 , "banks":[{"name":"Banco de Santa Cruz", "money": 50000},{"name":"Banco de San Juan", "money": 25000}]},
          { "id": 9, "description": "Leagajo", "total": 150000 , "banks":[{"name":"Banco de Santa Cruz", "money": 50000},{"name":"Banco de San Juan", "money": 25000}]},
          { "id": 10, "description": "Leagajo", "total": 150000 ,"banks":[{"name":"Banco de Santa Cruz", "money": 50000},{"name":"Banco de San Juan", "money": 25000}]}
        ];

        this.legajos = x;
        
    }


   

    legajoTapped(legajo) {
      this.nav.push(LegajoDetallePage, {
        legajo: legajo
      });
    }

   
}

export class Legajo {
  id: number;
  description: string;
  total: number;
  banks: Banks[];
}

class Banks {
  name: string;
  money : number;
}
