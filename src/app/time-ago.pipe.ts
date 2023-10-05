import { Pipe, PipeTransform } from '@angular/core';
import { formatDistanceToNow } from 'date-fns';

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {

  transform(timestamp: Date): unknown {
    const parsedTimestamp = new Date(timestamp);
    return formatDistanceToNow(parsedTimestamp, { addSuffix: true });
  }

}
