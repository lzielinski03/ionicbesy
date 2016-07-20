import {Component} from '@angular/core';
import {NavController, Alert} from 'ionic-angular';
import {FORM_DIRECTIVES, FormBuilder,  ControlGroup, Validators, AbstractControl} from '@angular/common';
import {LoginValidator} from './validators/loginValidator';
import {Http, HTTP_BINDINGS} from '@angular/http';
import {AuthService} from './../../services/auth/auth';
import 'rxjs/add/operator/map';

import {TabsPage} from './../tabs/tabs';

@Component({
	templateUrl: 'build/pages/login/login.html',
	directives: [FORM_DIRECTIVES],
    providers: [HTTP_BINDINGS, AuthService]
})
export class LoginPage {

    authForm: ControlGroup;
    username: AbstractControl;
    password: AbstractControl;

    constructor(public nav: NavController, private fb: FormBuilder, private http: Http, private authService:AuthService) {
    	this.authForm = fb.group({  
            'username': ['', Validators.compose([Validators.required, Validators.minLength(8), LoginValidator.checkFirstCharacterValidator])],
            'password': ['', Validators.compose([Validators.required, Validators.minLength(8), LoginValidator.checkFirstCharacterValidator])]
        });

    	this.username = this.authForm.controls['username'];
    	this.password = this.authForm.controls['password'];
    }

    login(event:Event): void {
        event.preventDefault();
        if(this.authForm.valid) {
            
            this.authService.login(this.username.value, this.password.value)
                .subscribe(() => 
                    this.nav.setRoot(TabsPage),
                    (alert:any) => this.nav.present(alert)
                );
        }
    }
}