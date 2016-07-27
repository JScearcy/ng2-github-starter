import {Component, OnInit, Input} from '@angular/core';
import {Http, Response} from '@angular/http';
import {StoreHelpers} from '../const/store-helpers';
import {GISTSSTORENAME} from '../const/store-names';

@Component({
    selector: 'gh-gists',
    styleUrls: ['src/gists/gists-component.css'],
    templateUrl: 'src/gists/gists-component.html',
})
export class GistsComponent {
     @Input()
        set gistsUrl (gistsUrl: string) {
            this._gistsUrl = gistsUrl;
            this.GetGists(this._gistsUrl);
         }
         get followersUrl (): string {
             return this._gistsUrl;
         }
    private _gistsUrl: string;

    constructor(private http: Http, private storeHelpers: StoreHelpers) {};

    public GetGists(gistsUrl: string) {
        this.http.get(gistsUrl).subscribe(
            (res: Response) => {
                console.log(res.json());
                this.storeHelpers.SetStore(res.json(), GISTSSTORENAME);
            },
            (err: any) => {
                console.error(err);
            }
        );
    }

    private ngOnInit() {
        this.storeHelpers.StoreFactory(GISTSSTORENAME, []);
    }
}
