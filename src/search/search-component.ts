import {Component, OnInit, Input} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/reduce';
import {IUser} from '../models/github-user.model';
import {searchCount, INCREMENT} from './search-count';
import {SUCCESSSTORENAME, FAILSTORENAME, CURRENTUSERSTORENAME} from '../const/store-names';
import {Followers} from '../followers/followers-component';
import {Following} from '../following/following-component';
import {DisplayUserPropPipe} from '../pipes/display-user-prop.pipe';
import {StoreHelpers} from '../const/store-helpers';

@Component({
    directives: [Followers, Following],
    pipes: [DisplayUserPropPipe],
    providers: [],
    selector: 'gh-search',
    styleUrls: ['src/search/search-component.css'],
    templateUrl: 'src/search/search-component.html',
})
export class SearchComponent {
    @Input() displayFollowers: string = 'false';
    @Input() displayFollowing: string = 'false';
    @Input() displaySearch: string = 'true';
    @Input() width: string = '100%';
    @Input() searchCount = 'false';
    @Input() failCount = 'false';

    private user: Observable<IUser>;
    private displayUser: boolean = false;
    private successObs: Observable<number>;
    private failObs: Observable<number>;
    private followersUrl: string;
    private followingUrl: string;

    constructor(private http: Http, private storeHelpers: StoreHelpers) {
    }

    public Search(username: string): any {
        this.http.get('https://api.github.com/users/' + username)
            .subscribe(
                (res: Response) => {
                    this.storeHelpers.SetStore(res.json(), CURRENTUSERSTORENAME);
                    this.user.take(1).subscribe((s: IUser) => {
                        console.log(s);
                        this.followersUrl = s.followers_url;
                        this.followingUrl = s.following_url;
                    });
                    this.displayUser = true;
                    this.updateNumberStore(SUCCESSSTORENAME, INCREMENT, this.successObs);
                },
                (err: any) => {
                    console.error(err.json().message);
                    this.displayUser = false;
                    this.updateNumberStore(FAILSTORENAME, INCREMENT, this.failObs);
                    this.storeHelpers.SetStore({}, CURRENTUSERSTORENAME);
                }
            );
    }

    public Reset(): void {
        // these are setting each store to 0 again
        this.storeHelpers.SetStore(0, FAILSTORENAME);
        this.storeHelpers.SetStore(0, SUCCESSSTORENAME);
    }

    private ngOnInit(): void {
        // create two stores to track the fails or successes of a search
        this.failObs = this.storeHelpers.StoreFactory(FAILSTORENAME, 0);
        this.successObs = this.storeHelpers.StoreFactory(SUCCESSSTORENAME, 0);
        this.user = this.storeHelpers.StoreFactory(CURRENTUSERSTORENAME, {});
    }

    // this funciton takes an observable, applies a transforming function to the data (searchCount in this case),
    // and updates the store with the new data
    private updateNumberStore(storeName: string, action: string, obs: Observable<number>): void {
        obs
            .take(1)
            .map((s: number) => searchCount(s, action))
            .subscribe((num: number) => {
                this.storeHelpers.SetStore(num, storeName);
            });
    }
}
