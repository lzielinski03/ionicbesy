import {Http, Response, Headers} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

const CONTENT_TYPE_HEADER:string = 'Content-Type';
const APPLICATION_JSON:string = 'application/json';
const BACKEND_URL:string = 'http://192.168.1.176:8090/auth/login';

@Injectable()
export class ExtendedHttpService {



	constructor(private http: Http) {
		this.http = http;
	}

	public post(arrs:any):Observable<Response> {
		let headers = new Headers();
		headers.append(CONTENT_TYPE_HEADER, APPLICATION_JSON);

		return this.http.post(BACKEND_URL, JSON.stringify(arrs), {headers:headers});
	}
}