import { Subscription } from 'rxjs/Subscription';
import { VenueService } from './../../../services/venue.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../../models/user';
import { Review } from '../../../models/review';
import { UserService } from '../../../services/user.service';
import { ReviewService } from '../../../services/review.service';
import { Venue } from '../../../models/venue';
import { Location } from "@angular/common";


@Component({
  selector: "app-review-new",
  templateUrl: "./review-new.component.html",
  styleUrls: ["./review-new.component.css"]
})
export class ReviewNewComponent implements OnInit, OnDestroy {
  venue: Venue = new Venue();
  reviews: Review[];
  newReview: Review = new Review();
  errors: string[] = [];

  subscription: Subscription;

  ratings = [
    { value: 1, viewValue: 1 },
    { value: 2, viewValue: 2 },
    { value: 3, viewValue: 3 },
    { value: 4, viewValue: 4 },
    { value: 5, viewValue: 5 }
  ];

  constructor(
    private _reviewService: ReviewService,
    private _userService: UserService,
    private _venueService: VenueService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.getVenue();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getVenue() {
    this.subscription = this._activatedRoute.params.subscribe(params =>
      this._venueService.showVenue(params.id, res => (this.venue = res))
    );
  }

  createReview() {
    this.errors = [];
    return this._reviewService.createReview(
      this.venue._id,
      this.newReview,
      review => {
        if (review.errors) {
          for (let key in review.errors) {
            let errors = review.errors[key];
            this.errors.push(errors.message);
          }
        } else {
          alert("Thank you, We are reviewing your message now");
          this.location.back();
        }
      }
    );
  }
}
