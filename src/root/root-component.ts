import {Component} from '@angular/core';
import {SearchComponent} from '../search/search-component';

@Component({
    directives: [SearchComponent],
    selector: 'gh-root',
    templateUrl: 'src/root/root-component.html',
})
export class RootComponent {

}