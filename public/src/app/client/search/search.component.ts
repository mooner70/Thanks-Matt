import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { AgmMap } from '@agm/core/directives/map';
import { google } from '@agm/core/services/google-maps-types';
import { VenueService } from '../../services/venue.service';
import { Venue } from '../../models/venue';
import { Router } from '@angular/router';
import { Vendor } from '../../models/vendor';
import { VendorService } from '../../services/vendor.service';
import { Category } from '../../models/category';
import { VendorTwo } from '../../models/vendor-two';
import { FilterVenuesPipe } from '../../pipes/filter-venues.pipe';

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"],
  preserveWhitespaces: false
})
export class SearchComponent implements OnInit {
  vendor = new Vendor();
  vendorTwo = new VendorTwo();
  venues: Array<Venue>;
  categories: Array<Category>;
  search_text: String = "";
  random: number;
  randomTwo: number;
  loaded: Boolean = false;

  zoom: number = 9;
  latitude: number;
  longitude: number;
  title: string;

  disabled = true;
  invert = false;
  max = 10000;
  min = 0;
  thumbLabel = true;
  value = 0;
  vertical = false;

  constructor(
    private _vendorService: VendorService,
    private _venueService: VenueService,
    private _categoryService: CategoryService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.loaded = false;
    this._vendorService.getVendors(vendor => {
      this.random = Math.floor(Math.random() * vendor.length);
      this.randomTwo = Math.floor(Math.random() * vendor.length);
      if (this.random === this.randomTwo) {
        this.randomTwo = Math.floor(Math.random() * vendor.length);
      } else {
        this.vendor = vendor[this.random];
        this.vendorTwo = vendor[this.randomTwo];
      }
    });
    this.getVenues();
    this.getCategories();
    setTimeout(() => {
      this.loaded = true;
    }, 3000);
  }

  getCategories(): void {
    this._categoryService.getCategories(
      categories => (this.categories = categories)
    );
  }

  getVenues(): void {
    this._venueService.getVenues(venues => (this.venues = venues));
  }
}


interface marker {
  icon: string;
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}