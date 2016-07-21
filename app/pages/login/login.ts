import {Component} from '@angular/core';
import {NavController, Alert} from 'ionic-angular';
import {FORM_DIRECTIVES, FormBuilder,  ControlGroup, Validators, AbstractControl} from '@angular/common';
import {LoginValidator} from './validators/loginValidator';
import {AuthService} from './../../services/auth/auth';
import 'rxjs/add/operator/map';

import {ExtendedHttpService} from './../../services/http/ExtendedHttpService';

import {TabsPage} from './../tabs/tabs';

@Component({
	templateUrl: 'build/pages/login/login.html',
	directives: [FORM_DIRECTIVES],
    providers: [AuthService, ExtendedHttpService]
})
export class LoginPage {

    authForm: ControlGroup;
    username: AbstractControl;
    password: AbstractControl;

    auth: AuthService;

    constructor(public nav: NavController, private fb: FormBuilder, private authService:AuthService) {
        this.auth = authService;

    	this.authForm = fb.group({  
            'username': ['', Validators.compose([Validators.required, Validators.minLength(8), LoginValidator.checkFirstCharacterValidator])],
            'password': ['', Validators.compose([Validators.required, Validators.minLength(8), LoginValidator.checkFirstCharacterValidator])]
        });
    	this.username = this.authForm.controls['username'];
    	this.password = this.authForm.controls['password'];
    }

    login(event:Event, authService:AuthService): void {
        event.preventDefault();
        if(this.authForm.valid) {
            
            this.authService.login(this.username.value, this.password.value)
                .subscribe(() => {
                    //this.authService.setLogged();
                    console.log(this.auth.isLoggedIn());
                    this.nav.push(TabsPage)
                },
                    (alert:any) => {
                        this.nav.present(alert);
                    }
                );
        }
    }

    
}