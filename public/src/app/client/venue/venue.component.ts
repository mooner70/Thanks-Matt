import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Router, ActivatedRoute } from '@angular/router';
import { Venue } from '../../models/venue';
import { VenueService } from '../../services/venue.service';
import { Subscription } from 'rxjs/Subscription';
import { Location } from '@angular/common';

import { AgmMap } from '@agm/core/directives/map';
import { google } from '@agm/core/services/google-maps-types';
import { Amenity } from '../../models/amenity';
import { AmenityService } from '../../services/amenity.service';

import { DomSanitizer } from '@angular/platform-browser';
import { SafeResourceUrl } from '@angular/platform-browser';
import { CdkOverlayOrigin, Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { CdkPortal, ComponentPortal, Portal } from '@angular/cdk/portal';
import {
  Component,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewContainerRef,
  ViewEncapsulation,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import { filter } from 'rxjs/operators/filter';
import { tap } from 'rxjs/operators/tap';
import { MatSidenav } from "@angular/material";
import { Vendor } from '../../models/vendor';
import { VendorService } from '../../services/vendor.service';
@Component({
  selector: "app-venue",
  templateUrl: "./venue.component.html",
  styleUrls: ["./venue.component.css"],
  preserveWhitespaces: false
})
export class VenueComponent implements OnInit, OnDestroy {
  venue = new Venue();
  vendor = new Vendor();
  subscription: Subscription;
  random: number;
  approved = Boolean;
  loaded: Boolean = false;
  rating: number;
  total = 0;
  ag: number;
  reviews= [];

  // OVERLAY & PORTAL
  nextPosition: number = 0;
  isMenuOpen: boolean = false;
  url: string;
  tourUrl: string;

  // MAP
  zoom: number = 18;
  latitude: number;
  longitude: number;
  title: string;

  @ViewChild("sidenav") sidenav: MatSidenav;

  @ViewChildren(CdkPortal) templatePortals: QueryList<Portal<any>>;
  @ViewChild(CdkOverlayOrigin) _overlayOrigin: CdkOverlayOrigin;

  @Output() close: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private _venueService: VenueService,
    private _vendorService: VendorService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    public overlay: Overlay,
    public viewContainerRef: ViewContainerRef,
    public sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.loaded = false;
    this.getVendor();
    this.getVenue();
    setTimeout(() => {
      this.loaded = true;
    }, 1000);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getVenue() {
    var count = 0;
    this.subscription = this._activatedRoute.params.subscribe(params =>
      this._venueService.showVenue(
        params.id,
        res => {
          for (let i = 0; i < res.reviews.length; i++) {
            this.total += res.reviews[i].rating;
            count++;
          }
          if(count > 0) {
            this.ag = this.total / count;
          } else {
            this.ag = 0;
          }
          (this.venue = res),
          (this.url = this.venue.video_url),
          (this.tourUrl = this.venue.tour_url)
        })
      )
  }

  getVendor() {
    this._vendorService.getVendors(vendor => {
      this.random = Math.floor(Math.random() * vendor.length);
      this.vendor = vendor[this.random];
    });
  }

  openPanelWithBackdrop() {
    let config = new OverlayConfig({
      hasBackdrop: true,
      backdropClass: "cdk-overlay-backdrop",
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically()
    });

    let overlayRef = this.overlay.create(config);
    overlayRef.attach(this.templatePortals.first);
    overlayRef.backdropClick().subscribe(() => overlayRef.detach());
  }

  reportReview(): void {
    let r = window.confirm("Thank you we are looking into it.");
    if (r == true) {
      window.close();
    }
  }

}

interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}