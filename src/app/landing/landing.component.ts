import {Component} from '@angular/core';
import { WOW } from 'wowjs/dist/wow.min';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.css']
})

export class Landing {
 constructor() {
     new WOW().init();
 }
}
