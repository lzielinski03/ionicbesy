import {Component, Input} from '@angular/core';
import {IONIC_DIRECTIVES, ViewController, Popover, NavController} from 'ionic-angular';

import {PopoverPage} from './../menu-popover/menu-popover';

@Component({
	selector: 'header-component',
	templateUrl: 'build/pages/components/header/header.html',
	directives: [IONIC_DIRECTIVES]
})
export class HeaderComponent {

	@Input() title:string;
	constructor(private nav: NavController) {
	}

	presentPopover(myEvent) {
		let popover = Popover.create(PopoverPage);
		this.nav.present(popover, {
			ev: myEvent
		});
	}
}



