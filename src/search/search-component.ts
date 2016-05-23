import {Component} from '@angular/core';
import {Http} from '@angular/http';
import {IUser} from '../models/github-user.model';
import 'rxjs/add/operator/map';

@Component({
    directives: [],
    providers: [],
    selector: 'gh-search',
    templateUrl: 'src/search/search-component.html',
})
export class SearchComponent {
    private http: Http;
    private user: IUser;
    private displayUser: boolean = false;

    constructor(http: Http) {
        this.http = http;
    }

    public Search(username: string): any {
        this.http.get('https://api.github.com/users/' + username)
            .map((res: any) => res.json())
            .subscribe((user: IUser) => {
                this.user = user;
                this.displayUser = true;
            });
    }
}
