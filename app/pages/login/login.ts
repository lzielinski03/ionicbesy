import {Component, provide} from '@angular/core';
import {NavController, Storage, LocalStorage} from 'ionic-angular';
import {FORM_DIRECTIVES, FormBuilder,  ControlGroup, Validators, AbstractControl} from '@angular/common';
import {LoginValidator} from './validators/loginValidator';

import {Http, Headers, HTTP_BINDINGS} from '@angular/http';
import {AuthService} from './../../services/auth/auth';
import {AuthHttp, AuthConfig, JwtHelper} from 'angular2-jwt';

import 'rxjs/add/operator/map';

import {TabsPage} from './../tabs/tabs';

@Component({
	templateUrl: 'build/pages/login/login.html',
	directives: [FORM_DIRECTIVES],
    providers: [
    provide(AuthHttp, {
      useFactory: (http) => {
      return new AuthHttp(new AuthConfig, http);
      },
      deps: [Http]
    }),
    HTTP_BINDINGS
  ]
})
export class LoginPage {

    authForm: ControlGroup;
    username: AbstractControl;
    password: AbstractControl;

    LOGIN_URL: string = "http://localhost:8090/auth/login";
    //SIGNUP_URL: string = "http://localhost:8090/users";
    
    local: Storage = new Storage(LocalStorage);
    loggedUser: string;
    contentHeader : Headers = new Headers({"Content-Type": "application/json"});
    jwtHelper: JwtHelper = new JwtHelper();

    /*
	
	auth: AuthService;
    //authType: string = 'login';
    
    //error: string;

    */
    

    constructor(public nav: NavController, private fb: FormBuilder, private http: Http) {
    	this.authForm = fb.group({  
            'username': ['', Validators.compose([Validators.required, Validators.minLength(8), LoginValidator.checkFirstCharacterValidator])],
            'password': ['', Validators.compose([Validators.required, Validators.minLength(8), LoginValidator.checkFirstCharacterValidator])]
        });

    	this.username = this.authForm.controls['username'];
    	this.password = this.authForm.controls['password'];
        
        /*
        this.nav = nav;
        this.auth = AuthService;
        this.local.get('profile').then(profile => {
            this.user = JSON.parse(profile);
        }).catch(error => {
            console.log(error);
        });*/
    }

    onSubmit(value: string): void { 
        if(this.authForm.valid) {
            console.log('Submitted value: ', value);
        }
    }

    login(credentials: string): void {
        if(this.authForm.valid) {
            console.log(credentials);
            console.log(JSON.stringify(credentials));

            this.http.post(this.LOGIN_URL, JSON.stringify(credentials), {headers: this.contentHeader})
            .map(res => res.json())
            .subscribe(
                data => {console.log(data);this.authSuccess(data.id_token)},
                err => console.log(err)
            );
/*
            this.http.post(this.LOGIN_URL, JSON.stringify(credentials), { headers: this.contentHeader })
            .map(res => res.json())
            .subscribe(
                data => this.authSuccess(data.id_token),
                err => console.log(err)
            );*/
        }
    }

    logout() {
        this.local.remove('id_token');
        this.loggedUser = null;
    }

    authSuccess(token) {
        //this.error = null;
        this.local.set('id_token', token);
        this.loggedUser = this.jwtHelper.decodeToken(token).username;
        this.nav.push(TabsPage);
    }

/*
    login(credentials) {
        console.log(credentials);
        this.http.post(this.LOGIN_URL, JSON.stringify(credentials), { headers: this.contentHeader })
        .map(res => res.json())
        .subscribe(
            data => this.authSuccess(data.id_token),
            err => console.log(err)
        );
    }

    signup(credentials) {
        this.http.post(this.SIGNUP_URL, JSON.stringify(credentials), { headers: this.contentHeader })
        .map(res => res.json())
        .subscribe(
            data => this.authSuccess(data.id_token),
            //err => { this.error = err; console.log(err); }
            err => console.log(err)
        );
    }

    

    authSuccess(token) {
        //this.error = null;
        this.local.set('id_token', token);
        this.user = this.jwtHelper.decodeToken(token).username;
        this.nav.push(TabsPage);
    }

    goLegajos() {
        this.nav.push(TabsPage);
    }*/
}
