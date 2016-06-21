import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
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
    private storeObs: Observable<number>;

    constructor(private http: Http, private tinyStore: TinyNgStore) {
    }

    public Search(username: string): any {
        this.http.get('https://api.github.com/users/' + username)
            .map((res: any) => res.json())
            .subscribe((user: IUser) => {
                this.user = user;
                this.displayUser = true;
            });
        // any time the search is performed, increment the store data
        this.changeStore(INCREMENT);
    }

    get SearchCount(): Observable<number> {
        // the async pipe can be applied to an observable to subscribe and sync with the current value
        return this.storeObs;
    }

    private changeStore(action: string): void {
        // take latest item, apply the value function, and update the data
        this.storeObs
            .take(1)
            .map((s: number) => searchCount(s, action))
            .subscribe((num: number) => {
                this.tinyStore.UpdateItem({ data: num, name: 'githubUsers' });
            });
    }

    private ngOnInit(): void {
        // insert a new store item and retrieve it, returning an observable 
        this.tinyStore.InsertItem({data: 0, name: 'githubUsers' });
        // map storeObs to automatically return the pertinent data
        this.storeObs =
            this.tinyStore.GetItem('githubUsers')
                .map((s: StoreItem) => s && s.data);
    }
}
