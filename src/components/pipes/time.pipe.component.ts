import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

import * as moment from 'moment';

@Pipe({
  name: 'broadTime'
})
export class TimePipeComponent extends DatePipe implements PipeTransform {

  transform(value: any, args?: any): any {

    if (value == null) {
        return 'completed';
    }

    var result = '';
    var duration = moment.duration(value, 'seconds');

    if (duration.days() > 0) {
        result += ` ${duration.days()} d`;
    }

    if (duration.hours() > 0) {
        result += ` ${duration.hours()} h`;
    }

    if (duration.minutes() > 0) {
        result += ` ${duration.minutes()} min`;
    }

    if (duration.seconds() > 0) {
        result += ` ${duration.seconds()} sec`;
    }

    result = result.trim();

    return result == '' ? 'completed' : result;
  }
}