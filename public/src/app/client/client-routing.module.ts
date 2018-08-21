import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientComponent } from './client.component';
import { SearchComponent } from './search/search.component';
import { VenueComponent } from './venue/venue.component';
import { Rights } from '../structure/footer/rights/rights.component';
import { LandingComponent } from './landing/landing.component';
import { ReviewNewComponent } from './venue/review-new/review-new.component';
import { VendorComponent } from './vendor/vendor.component';
import { VendorDisplayComponent } from './vendor/vendor-display/vendor-display.component';


const routes: Routes = [
  {
    path: "",
    component: ClientComponent,
    children: [
      {
        path: "",
        pathMatch: "full",
        component: LandingComponent
      },
      {
        path: "search",
        pathMatch: "full",
        component: SearchComponent
      },
      {
        path: "vendor",
        pathMatch: "full",
        component: VendorComponent
      },
      {
        path: "vendor/display/:id",
        pathMatch: "full",
        component: VendorDisplayComponent
      },
      {
        path: "venue/display/:id",
        pathMatch: "full",
        component: VenueComponent
      },
      {
        path: "venue/:id/review",
        pathMatch: "full",
        component: ReviewNewComponent
      },
      {
        path: "rights",
        pathMatch: "full",
        component: Rights
      }
    ]
  },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
