import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IUser } from '../models/github-user.model';
import 'rxjs/add/operator/take';

@Pipe({name: 'displayUserProp'})
export class DisplayUserPropPipe implements PipeTransform {
    public transform(value: Observable<IUser>, prop: string) {
        let user: IUser;
        value.take(1).subscribe((s: IUser) => user = s);
        return user[prop];
    }
}
