import {Injectable,Inject} from '@angular/core';
import {Http,Headers,Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {StorageUtils} from '../../utils/storage.utils';
import {Alert} from 'ionic-angular';
import {User} from '../../classes/user';

import {ExtendedHttpService} from './../../services/http/ExtendedHttpService';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

const CONTENT_TYPE_HEADER:string = 'Content-Type';
const APPLICATION_JSON:string = 'application/json';
const BACKEND_URL:string = 'http://192.168.1.176:8090/auth/login';

@Injectable()
export class AuthService {

	private currentUser: User;

	private isLogin:boolean = false;

	constructor(private http:Http, private http2: ExtendedHttpService) {
	}

	login(username:string, password:string):Observable<any> {
		let headers = new Headers();
		headers.append(CONTENT_TYPE_HEADER, APPLICATION_JSON);

		return this.http.post(BACKEND_URL, JSON.stringify({username:username, password:password}), {headers:headers}).map((res:Response) => {
			let loginData:any = res.json();
			let user:User = this.readJwt(loginData.token);
			user.username = username;
			user.password = password;
			StorageUtils.setAccount(user);
			StorageUtils.setToken(loginData.token);
			this.isLogin = true;
		

			return user;
			
		}).catch((err:any) => {
			console.log(err);
			let alert = Alert.create({
				title: 'Invalid credentials',
				subTitle: 'You entered invalid credentials !',
				buttons: ['Ok']
			});
			return Observable.throw(alert);
		});
	}

	login2(username:string, password:string):Observable<any> {
        return this.http2.post({username:'username', password:'password'})
        	.;
    }

	logout() {
		StorageUtils.removeAccount();
		StorageUtils.removeToken();
		this.isLogin = false;
	}

	private readJwt(token:string):User {
        let tokens:Array<any> = token.split('.');
        let tokenPayload:any = JSON.parse(atob(tokens[1]));

        let user:User = new User();
        user.lastConnection = new Date();
        user.email = tokenPayload.sub;

        return user;
	}

	isLoggedIn():boolean {
		return this.isLogin;
	}

	public setLogged() {
		this.isLogin = true;
	}
}