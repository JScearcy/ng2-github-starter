import {Component, OnInit, Input} from '@angular/core';
import {Http, Response} from '@angular/http';
import {IUser} from '../models/github-user.model';
import {StoreHelpers} from '../const/store-helpers';
import {FOLLOWINGSTORENAME} from '../const/store-names';
import {Observable} from 'rxjs/Observable';

@Component({
    directives: [],
    providers: [],
    selector: 'gh-following',
    styleUrls: ['src/following/following-component.css'],
    templateUrl: 'src/following/following-component.html',
})
export class Following {
    @Input()
        set followingUrl (followingUrl: string) {
            this._followingUrl = followingUrl;
            this.GetFollowing(this._followingUrl);
         }
         get followersUrl (): string {
             return this._followingUrl;
         }
    private following: Observable<IUser[]>;
    private _followingUrl: string;

    constructor(private http: Http, private storeHelpers: StoreHelpers) {};

    public GetFollowing(followingUrl: string): any {
        this.storeHelpers.SetStore([], FOLLOWINGSTORENAME);
        this.http.get(followingUrl)
            .subscribe(
                (res: Response) => {
                    console.log(res.json());
                    this.storeHelpers.SetStore(res.json(), FOLLOWINGSTORENAME);
                },
                (err: any) => {
                    console.log(err.json().message);
                }
            );
    }

    private ngOnInit() {
        // create a store for the list of followers for the current user
        this.following = this.storeHelpers.StoreFactory(FOLLOWINGSTORENAME, []);
    }
}
