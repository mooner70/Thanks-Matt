import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AmenityService } from '../../services/amenity.service';
import { VenueService } from '../../services/venue.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Venue } from '../../models/venue';
import { Amenity } from '../../models/amenity';

import { DomSanitizer } from "@angular/platform-browser";
import { SafeResourceUrl } from "@angular/platform-browser";
import { Vendor } from '../../models/vendor';
import { VendorService } from '../../services/vendor.service';

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
  preserveWhitespaces: false
})
export class DashboardComponent implements OnInit {
  amenities: Array<Amenity>;
  vendors: Array<Vendor>;
  venues: Array<Venue>;
  users: Array<User>;

  currentUser: User;
  url: string;

  constructor(
    private _amenityService: AmenityService,
    private _userService: UserService,
    private _venueService: VenueService,
    private _vendorService: VendorService,
    private _router: Router,
    public sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.isLoggedIn();
    this.getUsers();
    this.getAmenity();
    this.getVenues();
    this.getVendors();
    this.url = "https://datastudio.google.com/embed/reporting/1JFLQ3_C9IVy_XbUYukYkKs9VpnrAz27-/page/1M";
  }

  isLoggedIn() {
    if (this._userService.getCurrentUser() == null) {
      this._router.navigateByUrl("/");
    }
  }

  validateSession(): void {
    if (this.currentUser == null) {
      this._router.navigateByUrl("/");
    } else {
      console.log(this.currentUser._id);
    }
  }

  getVendors(): void {
    this._vendorService.getVendors(vendors => (this.vendors = vendors));
  }

  getVenues(): void {
    this._venueService.getVenues(venues => (this.venues = venues));
  }

  getAmenity(): void {
    this._amenityService.getAmenities(
      amenities => (this.amenities = amenities)
    );
  }

  getUsers(): void {
    this._userService.getUsers(users => (this.users = users));
  }
}

interface scriptSrc {
  reportSample: any;
  strictDynamic: any;

}
