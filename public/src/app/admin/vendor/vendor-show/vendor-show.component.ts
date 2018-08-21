import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { Vendor } from '../../../models/vendor';
import { VendorService } from '../../../services/vendor.service';


@Component({
  selector: "app-vendor-show",
  templateUrl: "./vendor-show.component.html",
  styleUrls: ["./vendor-show.component.css"]
})
export class VendorShowComponent implements OnInit {
  vendors: Vendor[];
  currentUser: User;
  errors: string[] = [];
  search_text: String = "";

  constructor(
    private _vendorService: VendorService,
    private _userService: UserService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.isLoggedIn();
    this.getVendors();
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

  getVendors(): void {
    this._vendorService.getVendorsInOrder(vendors => (this.vendors = vendors));
  }

  destroyVendor(id: string, idx: any) {
    let r = window.confirm("Delete Vendor?");
    if (r == true) {
      this._vendorService.destroy(id, res => this.vendors.splice(idx, 1));
    } else {
      window.close();
    }
  }
}
