import { Vendor } from './../models/vendor';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterVendors',
  pure: false
})
export class FilterVendorsPipe implements PipeTransform {
  transform(vendor_array: Array<Vendor>, search: string): Array<Vendor> {
    search = search.toString().toLowerCase();

    if (!vendor_array) {
      return [];
    } else {
      return vendor_array.filter(vendor => {
        return (vendor.name.toString().toLowerCase().includes(search) || vendor._category.name.toString().toLowerCase().includes(search));
      });
    }
  }
}