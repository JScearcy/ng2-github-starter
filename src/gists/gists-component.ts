import {Component, OnInit, Input} from '@angular/core';
import {Http, Response} from '@angular/http';
import {StoreHelpers} from '../const/store-helpers';
import {GISTSSTORENAME} from '../const/store-names';
import {Observable} from 'rxjs/Observable';
import {DescriptionPickerPipe} from '../pipes/description-picker.pipe';
import {NGL_DIRECTIVES} from 'ng-lightning/ng-lightning';

@Component({
    directives: [NGL_DIRECTIVES],
    pipes: [DescriptionPickerPipe],
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
    private gists: Observable<any>;

    constructor(private http: Http, private storeHelpers: StoreHelpers) {};

    public GetGists(gistsUrl: string): void {
        this.http.get(gistsUrl).subscribe(
            (res: Response) => {
                this.storeHelpers.SetStore(res.json(), GISTSSTORENAME);
            },
            (err: any) => {
                console.error(err);
            }
        );
    }

    private ngOnInit() {
        this.gists = this.storeHelpers.StoreFactory(GISTSSTORENAME, []);
    }
}
