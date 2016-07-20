import { Injectable } from '@angular/core';
import { TinyNgStore, StoreItem } from 'tiny-ng-store/tiny-ng-store';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class StoreHelpers {
    constructor(private tinyStore: TinyNgStore) {};

    public SetStore(val: any, storeName: string): void {
        this.tinyStore.UpdateItem({ data: val, name: storeName });
    }

    // this function will create a new StoreItem, then map the observable returned to utilize only the needed data
    public StoreFactory(storeName: string, initState: any): Observable<any> {
        return this.tinyStore
                .InsertItem({data: initState, name: storeName })
                .map((s: StoreItem) => s && s.data);
    }

    public GetStoreData(storeName: string): Observable<any> {
        return this.tinyStore
                .GetItem(storeName)
                .map((s: StoreItem) => s && s.data);
    }
}
