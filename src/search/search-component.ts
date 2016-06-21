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
                (res: any) => {
                    this.user = res.json();
                    this.displayUser = true;
                    this.successStore(INCREMENT);
                },
                (err: any) => {
                    console.error(err);
                    this.displayUser = false;
                    this.failStore(INCREMENT);
                }
            );
    }

    get SearchCount(): Observable<number> {
        // the async pipe can be applied to an observable to subscribe and sync with the current value
        return this.successObs;
    }

    get FailCount(): Observable<number> {
        return this.failObs;
    }

    private failStore(action: string): void {
        this.failObs
            .take(1)
            .map((s: number) => { console.log(s); return searchCount(s, action); })
            .subscribe((num: number) => {
                this.tinyStore.UpdateItem({ data: num, name: this.FAILSTORENAME });
            });
    }

    private successStore(action: string): void {
        // take latest item, apply the value function, and update the data
        this.successObs
            .take(1)
            .map((s: number) => { console.log(s); return searchCount(s, action); })
            .subscribe((num: number) => {
                this.tinyStore.UpdateItem({ data: num, name: this.SUCCESSSTORENAME });
            });
    }

    private ngOnInit(): void {
        this.failObs =
            this.tinyStore
                .InsertItem({data: 0, name: this.FAILSTORENAME})
                .map((s: StoreItem) => s && s.data);

        this.successObs =
            this.tinyStore
                .InsertItem({data: 0, name: this.SUCCESSSTORENAME })
                .map((s: StoreItem) => s && s.data);
    }
}
