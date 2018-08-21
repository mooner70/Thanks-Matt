import { AnalyticsService } from './services/analytics.service';
import { Router, NavigationEnd } from "@angular/router";
import { Component } from '@angular/core';

declare let ga: Function;
@Component({
  selector: "app-root",
  template: `
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  title = "Tulsa Venues";

  constructor(
    public router: Router,
    public googleAnalyticsEventsService: AnalyticsService
  ) {
    // this.router.events.subscribe(event => {
    //   if (event instanceof NavigationEnd) {
    //     ga("set", "page", event.urlAfterRedirects);
    //     ga("send", "pageview");
    //   }
    // });
  }

  submitEvent() {
    // this.googleAnalyticsEventsService.emitEvent(
    //   "testCategory",
    //   "testAction",
    //   "testLabel",
    //   10
    // );
  }
}
