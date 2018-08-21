import { VendorCategory } from './../../../models/vendor-category';
import { VendorCategoryService } from './../../../services/vendor-category.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { Sort } from '@angular/material';

@Component({
  selector: 'app-vendor-category-show',
  templateUrl: './vendor-category-show.component.html',
  styleUrls: ['./vendor-category-show.component.css']
})
export class VendorCategoryShowComponent implements OnInit {
  currentUser: User;
  categories: VendorCategory[];
  newCategory: VendorCategory = new VendorCategory();
  errors: string[] = [];

  sortedData: VendorCategory[];

  constructor(
    private _categoryService: VendorCategoryService,
    private _userService: UserService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.isLoggedIn();
    this.getCategories();
    this.sortData;
  }

  ngAfterViewInit() {
    this.sortData(name);
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

  getCategories(): void {
    this._categoryService.getCategories((categories) => this.categories = categories);
  }

  createCategory() {
    this.errors = [];
    return this._categoryService.createCategory(this.newCategory, (category) => {
      console.log(category);
      if (category.errors) {
        for (let key in category.errors) {
          let errors = category.errors[key];
          this.errors.push(errors.message);
        }
      } else {
        this.getCategories();
        this._router.navigate(['/list_vendor_category']);
      }
    })
  }

  destroyCategory(id: string, idx: any) {
    let r = window.confirm("Delete venue category?");
    if (r == true) {
      this._categoryService.destroy(id, res => this.categories.splice(idx, 1));
    } else {
      window.close();
    }
  }

  sortData(sort: Sort) :void {
    const data = this.categories;
    if (!sort.active || sort.direction == '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      let isAsc = sort.direction == 'asc';
      switch (sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
