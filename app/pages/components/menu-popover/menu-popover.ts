import {Component} from '@angular/core';
import {ViewController, Popover} from 'ionic-angular';

@Component({
	templateUrl: 'build/pages/components/menu-popover/menu-popover.html'
})
export class PopoverPage {
	constructor(private viewCtrl: ViewController) {}

	close() {
		this.viewCtrl.dismiss();
	}
}