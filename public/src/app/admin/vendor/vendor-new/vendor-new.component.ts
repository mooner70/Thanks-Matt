import { FormGroup } from '@angular/forms';
import { VendorCategory } from './../../../models/vendor-category';
import { VendorCategoryService } from './../../../services/vendor-category.service';
import { UserService } from './../../../services/user.service';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';
import { User } from '../../../models/user';
import { Vendor } from '../../../models/vendor';
import { VendorService } from '../../../services/vendor.service';


@Component ({
  selector: "app-vendor-new",
  templateUrl: "./vendor-new.component.html",
  styleUrls: ["./vendor-new.component.css"]
})
export class VendorNewComponent implements OnInit {
  currentUser: User;
  vendors: Vendor[];
  categories: VendorCategory[];
  newVendor: Vendor = new Vendor();
  errors: string[] = [];
  form: FormGroup;

  @ViewChild("files") file_input;
  @ViewChild("form", { read: ElementRef })
  my_form: ElementRef;
  @Output() newVendor_event = new EventEmitter();

  constructor(
    private _userService: UserService,
    private _vendorService: VendorService,
    private _categoryService: VendorCategoryService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.isLoggedIn();
    this.getVendors();
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

  getVendors(): void {
    this._vendorService.getVendors(vendors => (this.vendors = vendors));
  }
  
  getCategories(): void {
    this._categoryService.getCategories(
      categories => (this.categories = categories)
    );
  }

  createVendor() {
    if (this.currentUser !== null) {
      this.errors = [];
      return this._vendorService.createVendor(this.newVendor, vendor => {
        if (vendor.errors) {
          for (const key of Object.keys(vendor.errors)) {
            const errors = vendor.errors[key];
            this.errors.push(errors.message);
          }
        } else {
          this.getVendors();
          this.newVendor = new Vendor();
          this._router.navigate(["/list_vendor"]);
        }
      });
    } else {
      console.log("REPORTED: You are not a administrater");
      this._router.navigateByUrl("/");
    }
  }
}
