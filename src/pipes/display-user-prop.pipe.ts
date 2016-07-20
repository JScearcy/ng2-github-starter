import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IUser } from '../models/github-user.model';

@Pipe({name: 'displayUserProp'})
export class DisplayUserPropPipe implements PipeTransform {
    public transform(value: Observable<IUser>, prop: string) {
        let user: IUser;
        value.subscribe((s: IUser) => user = s);
        return user[prop];
    }
}
