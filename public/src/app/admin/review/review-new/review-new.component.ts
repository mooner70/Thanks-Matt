import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { Review } from '../../../models/review';
import { ReviewService } from '../../../services/review.service';

@Component({
  selector: 'app-review-new',
  templateUrl: './review-new.component.html',
  styleUrls: ['./review-new.component.css']
})
export class ReviewNewComponent implements OnInit {
  currentUser: User;
  reviews: Review[];
  newReview: Review = new Review();
  errors: string[] = [];

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
    private _router: Router
  ) { }

  ngOnInit() {
    this.isLoggedIn();
    this.getReviews();
  }

  isLoggedIn() {
    if (this._userService.getCurrentUser() == null) {
      console.log("You are not logged in with admin privlages", sessionStorage)
      this._router.navigateByUrl('/dashboard');
    }
  }

  validateSession(): void {
    if (!this.currentUser) {
      this._router.navigateByUrl('/');
    }
  }

  getReviews(): void {
    this._reviewService.getReviews((reviews) => this.reviews = reviews);
  }

  createReview() {
  //   this.errors = [];
  //   return this._reviewService.createReview(this.venue._id, this.newReview, (review) => {
  //     console.log(review);
  //     if (review.errors) {
  //       for (let key in review.errors) {
  //         let errors = review.errors[key];
  //         this.errors.push(errors.message);
  //       }
  //     } else {
  //       alert("Thank you, We are reviewing your message now")
  //       this.getReviews();
  //       this._router.navigate(['/list_review']);
  //     }
  //   })
  }

}
