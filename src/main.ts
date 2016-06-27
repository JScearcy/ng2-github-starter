import {bootstrap} from '@angular/platform-browser-dynamic';
import {HTTP_PROVIDERS} from '@angular/http';
import {SearchComponent} from './search/search-component';
import {TinyNgStore} from 'tiny-ng-store/tiny-ng-store';
import {ROUTER_DIRECTIVES} from '@angular/router';
let test = ROUTER_DIRECTIVES;
bootstrap(SearchComponent, [HTTP_PROVIDERS, TinyNgStore]);

