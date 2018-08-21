import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin.component';
import { AmenityShowComponent } from './amenity/amenity-show/amenity-show.component';
import { VenueShowComponent } from './venue/venue-show/venue-show.component';
import { AmenityEditComponent } from './amenity/amenity-edit/amenity-edit.component';
import { RegisterComponent } from '../auth/register/register.component';
import { VenueNewComponent } from './venue/venue-new/venue-new.component';
import { VenueEditComponent } from './venue/venue-edit/venue-edit.component';
import { ReviewShowComponent } from './review/review-show/review-show.component';
import { ReviewNewComponent } from './review/review-new/review-new.component';
import { ReviewEditComponent } from './review/review-edit/review-edit.component';
import { CategoryShowComponent } from './category/category-show/category-show.component';
import { CategoryEditComponent } from './category/category-edit/category-edit.component';
import { UploadComponent } from "./venue/upload/upload.component";
import { VendorCategoryShowComponent } from './vendor-category/vendor-category-show/vendor-category-show.component';
import { VendorCategoryEditComponent } from './vendor-category/vendor-category-edit/vendor-category-edit.component';
import { VendorUploadComponent } from './vendor/vendor-upload/vendor-upload.component';
import { VendorShowComponent } from './vendor/vendor-show/vendor-show.component';
import { VendorNewComponent } from './vendor/vendor-new/vendor-new.component';
import { VendorEditComponent } from './vendor/vendor-edit/vendor-edit.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'admin_dashboard',
        pathMatch: 'full',
        component: DashboardComponent
      },
      {
        path: 'list_amenity',
        pathMatch: 'full',
        component: AmenityShowComponent
      },
      {
        path: 'amenity/edit/:id',
        pathMatch: 'full',
        component: AmenityEditComponent 
      },
      {
        path: 'list_category',
        pathMatch: 'full',
        component: CategoryShowComponent
      },
      {
        path: 'list_vendor_category',
        pathMatch: 'full',
        component: VendorCategoryShowComponent
      },
      {
        path: 'category/edit/:id',
        pathMatch: 'full',
        component: CategoryEditComponent 
      },
      {
        path: 'vendor/category/edit/:id',
        pathMatch: 'full',
        component: VendorCategoryEditComponent 
      },
      {
        path: 'list_vendor',
        pathMatch: 'full',
        component: VendorShowComponent
      },
      {
        path: 'list_venue',
        pathMatch: 'full',
        component: VenueShowComponent
      },
      { 
        path: 'venue/add', 
        pathMatch: 'full', 
        component: VenueNewComponent 
      },
      { 
        path: 'venue/edit/:id', 
        pathMatch: 'full', 
        component: VenueEditComponent 
      },
      { 
        path: 'venue/upload/:id', 
        pathMatch: 'full', 
        component: UploadComponent
      },
      { 
        path: 'vendor/upload/:id', 
        pathMatch: 'full', 
        component: VendorUploadComponent
      },
      {
        path: 'list_review',
        pathMatch: 'full',
        component: ReviewShowComponent
      },
      { 
        path: 'review/add', 
        pathMatch: 'full', 
        component: ReviewNewComponent 
      },
      { 
        path: 'review/edit/:id', 
        pathMatch: 'full', 
        component: ReviewEditComponent 
      },
      { 
        path: 'vendor/add', 
        pathMatch: 'full', 
        component: VendorNewComponent
      },
      { 
        path: 'vendor/edit/:id', 
        pathMatch: 'full', 
        component: VendorEditComponent 
      },
      { 
        path: 'list_admin', 
        pathMatch: 'full', 
        component: RegisterComponent 
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
