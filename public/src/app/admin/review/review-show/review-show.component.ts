import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { Review } from '../../../models/review';
import { ReviewService } from '../../../services/review.service';

@Component({
  selector: 'app-review-show',
  templateUrl: './review-show.component.html',
  styleUrls: ['./review-show.component.css']
})
export class ReviewShowComponent implements OnInit {
  currentUser: User;
  reviews: Review[];
  newReview: Review = new Review();
  errors: string[] = [];

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

  getReviews() {
    this._reviewService.getReviews((reviews) => this.reviews = reviews);
  }

  destroyReview(id: string, idx: any) {
    this.isLoggedIn()
    let r = window.confirm("Delete Review?");
    if (r == true) {
      this._reviewService.destroyReview(id, res => this.reviews.splice(idx, 1));
    } else {
      window.close();
    }
  }

}
