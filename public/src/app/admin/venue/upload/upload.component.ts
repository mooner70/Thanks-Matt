import { Gallery } from './../../../models/gallery';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { User } from '../../../models/user';
import { Venue } from '../../../models/venue';
import { UserService } from '../../../services/user.service';
import { VenueService } from '../../../services/venue.service';
import { Location } from "@angular/common";


@Component({
  selector: "app-upload",
  templateUrl: "./upload.component.html",
  styleUrls: ["./upload.component.css"]
})
export class UploadComponent implements OnInit, OnDestroy {
  venue = new Venue();
  currentUser: User;
  subscription: Subscription;
  dataLoading: boolean;
  errors = [];
  tourErrors = [];
  galleryErrors = [];
  progressBarValue;

  @ViewChild("files") files_input;
  @ViewChild("formMultiple") multiple_form;
  @ViewChild("file") file_input;
  @ViewChild("form") my_form;
  @ViewChild("tourform") my_tourform;
  @Output() venue_event = new EventEmitter();

  constructor(
    private _venueService: VenueService,
    private _userService: UserService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    this.dataLoading = true;
    this.isLoggedIn();
    this.getVenue();
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

  getVenue() {
    this.subscription = this._activatedRoute.params.subscribe(params =>
      this._venueService.showVenue(params.id, res => (this.venue = res))
    );
  }

  uploadOne() {
    this.errors = [];
    if (this._userService.getCurrentUser() == null) {
      console.log("REPORTED: You do not have administration privilages");
      this._router.navigateByUrl("/");
    } else {
      let formData = new FormData(this.my_form.nativeElement);
      this._venueService.post_to_s3(formData, this.venue._id, res => {
        if (res.errors) {
          for (let key in res.errors) {
            let errors = res.errors[key];
            this.errors.push(errors.message);
          }
        } else {
          this.file_input.nativeElement.value = "";
          this.venue_event.emit();
          location.reload();
        }
      });
    }
  }

  uploadTour() {
    this.errors = [];
    if (this._userService.getCurrentUser() == null) {
      console.log("REPORTED: You do not have administration privilages");
      this._router.navigateByUrl("/");
    } else {
      let formData = new FormData(this.my_tourform.nativeElement);
      this._venueService.post_tour_pic_to_s3(formData, this.venue._id, res => {
        if (res.errors) {
          for (let key in res.errors) {
            let errors = res.errors[key];
            this.tourErrors.push(errors.message);
          }
        } else {
          this.file_input.nativeElement.value = "";
          this.venue_event.emit();
          location.reload();
        }
      });
    }
  }

  uploadMultiple() {
    this.errors = [];
    if (this._userService.getCurrentUser() == null) {
      console.log("REPORTED: You do not have administration privilages");
      this._router.navigateByUrl("/");
    } else {
      const files: FileList = this.files_input.nativeElement.files;
      if (files.length === 0) {
        console.log("No File Was Selected");
        return;
      }
      const formData = new FormData(this.multiple_form.nativeElement);
      formData.append(files[0].name, files[0]);
      this._venueService.post_multiple_to_s3(
        formData,
        this.venue._id,
        venue => {
          if (venue.errors) {
            for (const key of Object.keys(venue.errors)) {
              const errors = venue.errors[key];
              this.galleryErrors.push(errors.message);
            }
          }
          this.file_input.nativeElement.value = "";
          this.venue_event.emit();
          location.reload();
        }
      );
    }
  }

  deleteImage() {
    let r = window.confirm("Delete Image?");
    if (r == true) {
      this._venueService.deleteImage(this.venue._id, res => {
        location.reload();
      })
    } else {
      window.close();
    }
  } 
  deleteTourImage() {
    let r = window.confirm("Delete Tour Image?");
    if (r == true) {
      this._venueService.deleteTourImage(this.venue._id, res => {
        location.reload();
      })
    } else {
      window.close();
    }
  } 
  deleteGalleryImage(i) {
    let r = window.confirm("Delete Gallery Image?");
    if (r == true) {
      this.venue.gallery.indexOf(Gallery);
      if (i !== -1) {
        this.venue.gallery.splice(i, 1);
        this._venueService.updateVenue(this.venue, res => {
          if (res.errors) {
            for (const key of Object.keys(res.errors)) {
              const errors = res.errors[key];
              this.errors.push(errors.message);
            }
          } else {
            location.reload();
          }
        });
      }
    } else {
      window.close();
    } 
  } 
}
