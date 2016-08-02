import {bootstrap} from '@angular/platform-browser-dynamic';
import {HTTP_PROVIDERS} from '@angular/http';
import {RootComponent} from './root/root-component';
import {TinyNgStore} from 'tiny-ng-store/tiny-ng-store';
import {StoreHelpers} from './const/store-helpers';
import {provideNglConfig} from 'ng-lightning/ng-lightning';

bootstrap(RootComponent, [HTTP_PROVIDERS, StoreHelpers, TinyNgStore, provideNglConfig()]);

