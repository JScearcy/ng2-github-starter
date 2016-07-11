import {Component, OnInit} from '@angular/core';
import {Http, Response} from '@angular/http';
import {TinyNgStore, StoreItem} from 'tiny-ng-store/tiny-ng-store';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/reduce';
import {IUser} from '../models/github-user.model';
import {searchCount, INCREMENT} from './search-count';

@Component({
    directives: [],
    providers: [],
    selector: 'gh-search',
    templateUrl: 'src/search/search-component.html',
})
export class SearchComponent {
    private user: IUser;
    private displayUser: boolean = false;
    private successObs: Observable<number>;
    private failObs: Observable<number>;
    private FAILSTORENAME: string = 'gihubUserFail';
    private SUCCESSSTORENAME: string = 'githubUserSuccess';

    constructor(private http: Http, private tinyStore: TinyNgStore) {
    }

    public Search(username: string): any {
        this.http.get('https://api.github.com/users/' + username)
            .subscribe(
                (res: Response) => {
                    this.user = res.json();
                    this.displayUser = true;
                    this.updateNumberStore(this.SUCCESSSTORENAME, INCREMENT, this.successObs);
                },
                (err: any) => {
                    console.error(err.json().message);
                    this.displayUser = false;
                    this.updateNumberStore(this.FAILSTORENAME, INCREMENT, this.failObs);
                }
            );
    }

    public Reset(): void {
        // these are setting each store to 0 again
        this.setStore(0, this.FAILSTORENAME);
        this.setStore(0, this.SUCCESSSTORENAME);
    }

    get SearchCount(): Observable<number> {
        // the async pipe can be applied to an observable to subscribe and sync with the current value
        return this.successObs;
    }

    get FailCount(): Observable<number> {
        // the async pipe can be applied to an observable to subscribe and sync with the current value
        return this.failObs;
    }

    private ngOnInit(): void {
        // create two stores to track the fails or successes of a search
        this.failObs = this.numberStoreFactory(this.FAILSTORENAME, 0);
        this.successObs = this.numberStoreFactory(this.SUCCESSSTORENAME, 0);
    }
    // this function will create a new StoreItem, then map the observable returned to utilize only the needed data
    private numberStoreFactory(storeName: string, initState: number): Observable<number> {
        return this.tinyStore
                .InsertItem({data: initState, name: storeName })
                .map((s: StoreItem) => s && s.data);
    }
    // this funciton takes an observable, applies a transforming function to the data (searchCount in this case),
    // and updates the store with the new data
    private updateNumberStore(storeName: string, action: string, obs: Observable<number>): void {
        obs
            .take(1)
            .map((s: number) => searchCount(s, action))
            .subscribe((num: number) => {
                this.setStore(num, storeName);
            });
    }
    // this function takes a store name plus data and updates that store with the new data
    private setStore(val: number, storeName: string): void {
        this.tinyStore.UpdateItem({ data: val, name: storeName });
    }
}
