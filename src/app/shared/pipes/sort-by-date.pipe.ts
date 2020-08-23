import { Pipe, PipeTransform } from '@angular/core';
import { Record } from 'src/app/state/records/records.model';

@Pipe({
  name: 'sortByDate'
})
export class SortByDatePipe implements PipeTransform {

  transform(records: Record[], option: string) {
    const r = [...records];

    if (option === 'new:first') {
      return r.sort((a, b) => (new Date(b.createDate).getTime() - new Date(a.createDate).getTime()));
    }

    if (option === 'old:first') {
      return r.sort((a, b) => (new Date(a.createDate).getTime() - new Date(b.createDate).getTime()));
    }

    return records;
  }

}
