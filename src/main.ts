import {bootstrap} from '@angular/platform-browser-dynamic';
import {HTTP_PROVIDERS} from '@angular/http';
import {SearchComponent} from './search/search-component';
import {TinyNgStore} from 'tiny-ng-store/tiny-ng-store';

bootstrap(SearchComponent, [HTTP_PROVIDERS, TinyNgStore]);

