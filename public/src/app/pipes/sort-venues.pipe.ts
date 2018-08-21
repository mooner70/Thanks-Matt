import { Pipe, PipeTransform } from '@angular/core';
import { Venue } from '../models/venue';

@Pipe({
  name: 'sortVenues',
  pure: false
})
export class SortVenuesPipe implements PipeTransform {

  transform(venue_array: Array<Venue>, field: any): any {
    return venue_array.sort((a, b) => {
      if (a[field] < b[field]) {
        return -1
      } else if (a[field] > b[field]) {
        return 1
      } else {
        return 0
      }
    });
  }
}
