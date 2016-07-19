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
    private followers: Observable<IUser[]>;
    private FAILSTORENAME: string = 'gihubUserFail';
    private SUCCESSSTORENAME: string = 'githubUserSuccess';
    private FOLLOWERSSTORENAME: string = 'followers';

    constructor(private http: Http, private tinyStore: TinyNgStore) {
    }

    public Search(username: string): any {
        this.setStore([], this.FOLLOWERSSTORENAME);
        this.http.get('https://api.github.com/users/' + username)
            .subscribe(
                (res: Response) => {
                    this.user = res.json();
                    this.displayUser = true;
                    if (this.user.followers_url && this.user.followers_url.length > 0) {
                        this.GetFollowers(this.user.followers_url);
                    }
                    this.updateNumberStore(this.SUCCESSSTORENAME, INCREMENT, this.successObs);
                },
                (err: any) => {
                    console.error(err.json().message);
                    this.displayUser = false;
                    this.updateNumberStore(this.FAILSTORENAME, INCREMENT, this.failObs);
                }
            );
    }

    public GetFollowers(followersUrl: string): any {
        this.http.get(followersUrl)
            .subscribe(
                (res: Response) => {
                    this.tinyStore.UpdateItem({ data: res.json(), name: this.FOLLOWERSSTORENAME });
                },
                (err: any) => {
                    console.log(err.json().message);
                }
            );
    }

    public Reset(): void {
        // these are setting each store to 0 again
        this.setStore(0, this.FAILSTORENAME);
        this.setStore(0, this.SUCCESSSTORENAME);
    }

    private ngOnInit(): void {
        // create two stores to track the fails or successes of a search
        this.failObs = this.storeFactory(this.FAILSTORENAME, 0);
        this.successObs = this.storeFactory(this.SUCCESSSTORENAME, 0);
        // create a store to hold a list of followers
        this.followers = this.storeFactory(this.FOLLOWERSSTORENAME, []);
    }
    // this function will create a new StoreItem, then map the observable returned to utilize only the needed data
    private storeFactory(storeName: string, initState: any): Observable<any> {
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
    private setStore(val: any, storeName: string): void {
        this.tinyStore.UpdateItem({ data: val, name: storeName });
    }
}
