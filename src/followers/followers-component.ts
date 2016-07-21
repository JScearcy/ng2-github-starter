import {Component, OnInit, Input} from '@angular/core';
import {Http, Response} from '@angular/http';
import {IUser} from '../models/github-user.model';
import {StoreHelpers} from '../const/store-helpers';
import {FOLLOWERSSTORENAME} from '../const/store-names';
import {Observable} from 'rxjs/Observable';

@Component({
    directives: [],
    providers: [],
    selector: 'gh-followers',
    styleUrls: ['src/followers/followers-component.css'],
    templateUrl: 'src/followers/followers-component.html',
})
export class Followers {
    @Input()
        set followersUrl (followersUrl: string) {
            this._followersUrl = followersUrl;
            this.GetFollowers(this._followersUrl);
         }
         get followersUrl () {
             return this._followersUrl;
         }
    private followers: Observable<IUser[]>;
    private _followersUrl: string;

    constructor(private http: Http, private storeHelpers: StoreHelpers) {};

    public GetFollowers(followersUrl: string): any {
        this.storeHelpers.SetStore([], FOLLOWERSSTORENAME);
        this.http.get(followersUrl)
            .subscribe(
                (res: Response) => {
                    this.storeHelpers.SetStore(res.json(), FOLLOWERSSTORENAME);
                },
                (err: any) => {
                    console.log(err.json().message);
                }
            );
    }

    private ngOnInit() {
        // create a store for the list of followers for the current user
        this.followers = this.storeHelpers.StoreFactory(FOLLOWERSSTORENAME, []);
    }
}
