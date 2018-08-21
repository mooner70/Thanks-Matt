import { Location } from "@angular/common";
import { Subscription } from "rxjs/Subscription";
import { Http } from "@angular/http";
import { Component, OnInit, Input } from "@angular/core";
import { User } from "../../../models/user";
import { UserService } from "../../../services/user.service";
import { Router, ActivatedRoute } from "@angular/router";
import { OnDestroy } from "@angular/core/src/metadata/lifecycle_hooks";
import { MatTabChangeEvent } from "@angular/material";
import { Vendor } from "../../../models/vendor";
import { VendorCategory } from "../../../models/vendor-category";
import { VendorService } from "../../../services/vendor.service";
import { VendorCategoryService } from "../../../services/vendor-category.service";

@Component({
  selector: "app-vendor-edit",
  templateUrl: "./vendor-edit.component.html",
  styleUrls: ["./vendor-edit.component.css"]
})
export class VendorEditComponent implements OnInit, OnDestroy {
  vendor = new Vendor();
  categories: VendorCategory[];
  currentUser: User;
  subscription: Subscription;
  dataLoading: boolean;
  errors: string[] = [];

  constructor(
    private _vendorService: VendorService,
    private _categoryService: VendorCategoryService,
    private _userService: UserService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    this.dataLoading = true;
    this.isLoggedIn();
    this.getVendor();
    this.getCategories();
    this.dataLoading = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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

  getVendor() {
    this.subscription = this._activatedRoute.params.subscribe(params =>
      this._vendorService.showVendor(params.id, res => (this.vendor = res))
    );
  }

  getCategories(): void {
    this._categoryService.getCategories(
      categories => (this.categories = categories)
    );
  }

  updateVendor() {
    this._vendorService.updateVendor(this.vendor, res => {
      if (res.errors) {
        for (const key of Object.keys(res.errors)) {
          const errors = res.errors[key];
          this.errors.push(errors.message);
        }
      } else {
        this._router.navigate(["/list_vendor"]);
      }
    });
  }
}
