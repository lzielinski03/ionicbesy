import {Injectable,Inject} from '@angular/core';
import {Http,Headers,Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {StorageUtils} from '../../utils/storage.utils';
import {Alert} from 'ionic-angular';
import {User} from '../../classes/user';

//import {tokenNotExpired} from 'angular2-jwt';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

const CONTENT_TYPE_HEADER:string = 'Content-Type';
const APPLICATION_JSON:string = 'application/json';
const BACKEND_URL:string = 'http://localhost:8090/auth/login';

@Injectable()
export class AuthService {
	constructor(private http:Http) {}

	login(username:string, password:string):Observable<any> {
		let headers = new Headers();
		headers.append(CONTENT_TYPE_HEADER, APPLICATION_JSON);
		console.log(username);
		console.log(password);
		return this.http.post(BACKEND_URL, JSON.stringify({username:username, password:password}), {headers:headers}).map((res:Response) => {
			let loginData:any = res.json();
			console.log(res);
/*
			console.log(res.ok);
			console.log(res.status);
			console.log(loginData);
*/
			let user:User = this.readJwt(loginData.token);
			user.username = username;
			user.password = password;
			StorageUtils.setAccount(user);
			StorageUtils.setToken(loginData.token);

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

	private readJwt(token:string):User {
        let tokens:Array<any> = token.split('.');
        let tokenPayload:any = JSON.parse(atob(tokens[1]));

        let user:User = new User();
        user.lastConnection = new Date();
        user.email = tokenPayload.sub;
        //user.id = parseInt(tokenPayload.iss);
        //user.firstName = tokenPayload.firstName;
        //user.lastName = tokenPayload.lastName;
        //user.roles = tokenPayload.role;

        return user;
	}
}