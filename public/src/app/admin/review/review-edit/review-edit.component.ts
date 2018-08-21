import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { Review } from '../../../models/review';
import { ReviewService } from '../../../services/review.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-review-edit',
  templateUrl: './review-edit.component.html',
  styleUrls: ['./review-edit.component.css']
})
export class ReviewEditComponent implements OnInit, OnDestroy {
  review = new Review();
  currentUser: User;
  reviews_list: Array<Review>;
  subscription: Subscription;
  approved = Boolean

  constructor(
    private _route: ActivatedRoute,
    private _reviewService: ReviewService,
    private _userService: UserService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.isLoggedIn();
    this.getReviews();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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
    this.subscription = this._activatedRoute.params.subscribe(
      params => this._reviewService.showReview(params.id, res => this.review = res)
    );
  }

  updateReview() {
    this.isLoggedIn();
    this._reviewService.updateReview(this.review, res => {
      this._router.navigate(['/list_review']);
    });
  }

}
