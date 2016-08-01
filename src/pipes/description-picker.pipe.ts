import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'description'})
export class DescriptionPickerPipe implements PipeTransform {
    public transform(value: any): string {
        let description: string = 'No Description';
        if (value.description && value.description.length) {
            description = value.description;
        } else if (value.files) {
            description = 'Files: ';
            for (let file in value.files) {
                if (file && file.length) {
                    description += file + '; ';
                }
            }
        }
        return description;
    }
}
