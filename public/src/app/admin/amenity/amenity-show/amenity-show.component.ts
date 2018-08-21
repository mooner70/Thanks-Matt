import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';
import { Amenity } from '../../../models/amenity';
import { AmenityService } from '../../../services/amenity.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-amenity-show',
  templateUrl: './amenity-show.component.html',
  styleUrls: ['./amenity-show.component.css']
})
export class AmenityShowComponent implements OnInit {
  currentUser: User;
  amenities: Amenity[];
  newAmenity: Amenity = new Amenity();
  errors: string[] = [];
  
  constructor(
    private _amenityService: AmenityService,
    private _userService: UserService,
    private _router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    this.isLoggedIn();
    this.getAmenities();
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

  getAmenities(): void {
    this._amenityService.getAmenities((amenities) => this.amenities = amenities);
  }

  createAmenity() {
    this.errors = [];
    return this._amenityService.createAmenity(this.newAmenity, (amenity) => {
      console.log(amenity);
      if (amenity.errors) {
        for (let key in amenity.errors) {
          let errors = amenity.errors[key];
          this.errors.push(errors.message);
        }
      } else {
        this.getAmenities();
        this._router.navigate(['/list_amenity']);
      }
    })
  }

  goBack(): void {
    this.location.back();
  }

  destroyAmenity(id: string, idx: any) {
    let r = window.confirm("Delete Amenity?");
    if(r == true) {
      this._amenityService.destroy(id, res => this.amenities.splice(idx, 1));
    } else {
      window.close()
    }
  }
}
