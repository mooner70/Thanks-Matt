import { UserService } from './../../../services/user.service';
import { Component, OnInit, Output, ViewChild, EventEmitter, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../../models/user';
import { Venue } from '../../../models/venue';
import { VenueService } from '../../../services/venue.service';
import { AmenityService } from '../../../services/amenity.service';
import { Amenity } from '../../../models/amenity';
import { FormControl, FormGroup } from '@angular/forms';
import { Category } from '../../../models/category';
import { CategoryService } from '../../../services/category.service';
import { MatChipInputEvent } from '@angular/material';

@Component({
  selector: "app-venue-new",
  templateUrl: "./venue-new.component.html",
  styleUrls: ["./venue-new.component.css"]
})
export class VenueNewComponent implements OnInit {
  currentUser: User;
  venues: Venue[];
  amenitiesList: Amenity[];
  categories: Category[];
  newVenue: Venue = new Venue();
  errors: string[] = [];
  form: FormGroup;


  @ViewChild("files") file_input;
  @ViewChild("form", { read: ElementRef }) my_form: ElementRef;
  @Output() newVenue_event = new EventEmitter();

  constructor(
    private _userService: UserService,
    private _venueService: VenueService,
    private _amenityService: AmenityService,
    private _categoryService: CategoryService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.isLoggedIn();
    this.getVenues();
    this.getAmenities();
    this.getCategories();
    this.form = new FormGroup({});
  }

  isLoggedIn() {
    if (this._userService.getCurrentUser() == null) {
      console.log("You are not logged in with admin privlages", sessionStorage);
      this._router.navigateByUrl("/");
    }
  }

  validateSession(): void {
    if (!this.currentUser) {
      this._router.navigateByUrl("/");
    }
  }

  getVenues(): void {
    this._venueService.getVenues(venues => (this.venues = venues));
  }
  getAmenities(): void {
    this._amenityService.getAmenities(
      amenities => (this.amenitiesList = amenities)
    );
  }
  getCategories(): void {
    this._categoryService.getCategories(
      categories => (this.categories = categories)
    );
  }

  createVenue() {
    if (this.currentUser !== null) {
      console.log("*** currentUser:", this.currentUser)
      this.errors = [];
      return this._venueService.createVenue(this.newVenue, (venue) => {
        console.log(venue);
        if (venue.errors) {
          for (const key of Object.keys(venue.errors)) {
            const errors = venue.errors[key];
            this.errors.push(errors.message);
          }
        } else {
          this.getVenues();
          this.newVenue = new Venue();
          this._router.navigate(['/list_venue']);
        }
      })
    } else {
      console.log("REPORTED: You are not a administrater")
      this._router.navigateByUrl('/');
    }
  }
}
