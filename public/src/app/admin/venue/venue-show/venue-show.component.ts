import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { VenueService } from './../../../services/venue.service';
import { UserService } from './../../../services/user.service';
import { Component, OnInit, Inject } from '@angular/core';
import { User } from '../../../models/user';
import { Venue } from '../../../models/venue';

@Component({
  selector: 'app-venue-show',
  templateUrl: './venue-show.component.html',
  styleUrls: ['./venue-show.component.css']
})
export class VenueShowComponent implements OnInit {
  venues: Venue[];
  currentUser: User;
  errors: string[] = [];
  search_text: String = '';

  constructor(
    private _venueService: VenueService,
    private _userService: UserService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.isLoggedIn();
    this.getVenues();
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

  getVenues(): void {
    this._venueService.getVenuesInOrder(venues => (this.venues = venues));
  }

  destroyVenue(id: string, idx: any) {
    let r = window.confirm("Delete Venue?");
    if (r == true) {
      this._venueService.destroy(id, res => this.venues.splice(idx, 1));
    } else {
      window.close();
    }
  }
}