import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'myfilter' })
export class MyFilterPipe implements PipeTransform {
    transform(items: any[], args: any[]): any {
        let filter = new Date();
        let comparator = args[2] ||  '>';
        if (args[1] != 'now')
            filter = new Date(args[1]);
        // filter items array, items which match and return true will be kept, false will be filtered out
        return items.filter(item => {
            if (comparator === 'before')
                return new Date(item[args[0]]) < filter
            else
                return new Date(item[args[0]]) > filter
        });
    }
}
