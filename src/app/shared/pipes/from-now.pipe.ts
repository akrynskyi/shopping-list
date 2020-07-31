import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'fromNow'
})
export class FromNowPipe implements PipeTransform {

  transform(value: Date): string {
    const isDate = moment(value).isValid();

    if (isDate) {
      return moment(value).fromNow();
    }

    return value.toString();
  }

}
