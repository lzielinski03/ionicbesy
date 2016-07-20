import {Component, Input} from '@angular/core';
import {IONIC_DIRECTIVES} from 'ionic-angular';

@Component({
	selector: 'header-component',
	templateUrl: 'build/pages/components/header/header.html',
	directives: [IONIC_DIRECTIVES]
})
export class HeaderComponent {

	@Input() title:string;
	constructor() {

	}
}
