import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../models/category';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit, OnDestroy {
  category = new Category();
  currentUser: User;
  amenities_list: Array<Category>;
  subscription: Subscription;

  constructor(
    private _route: ActivatedRoute,
    private _categoryService: CategoryService,
    private _userService: UserService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) { }

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
      params => this._categoryService.showCategory(params.id, res => this.category = res)
    );
  }

  updateCategory() {
    this._categoryService.updateCategory(this.category, res => {
      this._router.navigate(['/list_category']);
    });
  }

}
