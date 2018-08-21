import { Component, OnInit } from '@angular/core';;
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { VenueService } from '../../services/venue.service';
import { Venue } from '../../models/venue';
import { Vendor } from '../../models/vendor';
import { VendorService } from '../../services/vendor.service';

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.css"],
  preserveWhitespaces: false
})
export class LandingComponent implements OnInit {
  vendors: Array<Vendor>;
  categories: Array<Category>;
  venues: Array<Venue>;

  showDelay = 300;
  length: number;

  constructor(
    private _vendorService: VendorService,
    private _categoryService: CategoryService,
    private _venueService: VenueService
  ) {}

  ngOnInit() {
    this.length = 0;
    this.getCategories();
    this.getVenues();
    this.getVendors();
  }

  getCategories(): void {
    this._categoryService.getCategories(
      categories => (this.categories = categories)
    );
  }

  getVenues(): void {
    this._venueService.getVenues(venues => (this.venues = venues.slice(0, 4)));
  }

  getVendors(): void {
    this._vendorService.getVendors(vendors => (this.vendors = vendors.slice(0, 4)));
  }
}
