import { VendorCategory } from './../../models/vendor-category';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { VendorService } from '../../services/vendor.service';
import { Vendor } from "./../../models/vendor";
import { VendorCategoryService } from '../../services/vendor-category.service';

@Component({
  selector: "app-vendor",
  templateUrl: "./vendor.component.html",
  styleUrls: ["./vendor.component.css"],
  preserveWhitespaces: false
})
export class VendorComponent implements OnInit {
  vendors: Array<Vendor>;
  vendorCategories: Array<VendorCategory>;
  loaded: Boolean = false;

  //search
  search_text: String = "";

  constructor(
    private _vendorService: VendorService,
    private _vendorCategoryService: VendorCategoryService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    this.loaded = false;
    this.getCategories();
    this.getVendors();
    setTimeout(() => {
      this.loaded = true;
    }, 1000);
  }

  getVendors(): void {
    this._vendorService.getVendors(vendors => (this.vendors = vendors));
  }

  getCategories(): void {
    this._vendorCategoryService.getCategories(
      vendorCategories => (this.vendorCategories = vendorCategories)
    );
  }

  goBack(): void {
    this.location.back();
  }
}
