import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';
import { Amenity } from '../../../models/amenity';
import { AmenityService } from '../../../services/amenity.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-amenity-edit',
  templateUrl: './amenity-edit.component.html',
  styleUrls: ['./amenity-edit.component.css']
})
export class AmenityEditComponent implements OnInit, OnDestroy {
  amenity = new Amenity();
  currentUser: User;
  amenities_list: Array<Amenity>;
  subscription: Subscription;

  constructor(
    private _route: ActivatedRoute,
    private _amenityService: AmenityService,
    private _userService: UserService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit() {
    this.isLoggedIn();
    this.getAmenities();
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

  getAmenities() {
    this.subscription = this._activatedRoute.params.subscribe(
      params => this._amenityService.showAmenity(params.id, res => this.amenity = res)
    );
  }

  updateAmenity() {
    this._amenityService.updateAmenity(this.amenity, res => {
      this._router.navigate(['/list_amenity']);
    });
  }
}
