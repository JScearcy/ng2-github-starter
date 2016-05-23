import {bootstrap} from '@angular/platform-browser-dynamic';
import {HTTP_PROVIDERS} from '@angular/http';
import {SearchComponent} from './search/search-component';

bootstrap(SearchComponent, [HTTP_PROVIDERS]);
