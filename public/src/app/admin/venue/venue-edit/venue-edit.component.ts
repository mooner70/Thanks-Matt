import { Location } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';
import { Http } from '@angular/http';
import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Venue } from '../../../models/venue';
import { VenueService } from '../../../services/venue.service';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../models/category';
import { MatTabChangeEvent } from '@angular/material';
import { Amenity } from '../../../models/amenity';
import { AmenityService } from '../../../services/amenity.service';

@Component({
  selector: "app-venue-edit",
  templateUrl: "./venue-edit.component.html",
  styleUrls: ["./venue-edit.component.css"]
})
export class VenueEditComponent implements OnInit, OnDestroy {
  venue = new Venue();
  amenityList: Amenity[];
  categories: Category[];
  currentUser: User;
  subscription: Subscription;
  dataLoading: boolean;
  errors: string[] = [];

  constructor(
    private _venueService: VenueService,
    private _amenityService: AmenityService,
    private _categoryService: CategoryService,
    private _userService: UserService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    this.dataLoading = true;
    this.isLoggedIn();
    this.getVenue();
    this.getAmenities();
    this.getCategories();
    this.dataLoading = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  isLoggedIn() {
    if (this._userService.getCurrentUser() == null) {
      console.log("You are not logged in with admin privlages", sessionStorage);
      this._router.navigateByUrl("/dashboard");
    }
  }

  validateSession(): void {
    if (!this.currentUser) {
      this._router.navigateByUrl("/");
    }
  }

  getVenue() {
    this.subscription = this._activatedRoute.params.subscribe(params =>
      this._venueService.showVenue(params.id, res => (this.venue = res))
    );
  }

  getAmenities() {
    this._amenityService.getAmenities(
      amenities => (this.amenityList = amenities)
    );
  }

  getCategories(): void {
    this._categoryService.getCategories(
      categories => (this.categories = categories)
    );
  }

  updateVenue() {
    this.errors = [];
    this._venueService.updateVenue(this.venue, res => {
      console.log("venue", this.venue);
      console.log("res", res);
      console.log("errors", this.errors);
      if (res.errors) {
        for (const key of Object.keys(res.errors)) {
          const errors = res.errors[key];
          this.errors.push(errors.message);
        }
      } else {
        this._router.navigate(["/list_venue"]);
      }
    });
  }
  // updateVenue() {
  //   this._venueService.updateVenue(this.venue, res => {
  //     this._router.navigate(["/list_venue"]);
  //   });
  // }
}