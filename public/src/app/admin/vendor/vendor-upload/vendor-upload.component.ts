import { Gallery } from './../../../models/gallery';
import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { VendorService } from '../../../services/vendor.service';
import { Subscription } from 'rxjs';
import { User } from '../../../models/user';
import { Vendor } from '../../../models/vendor';
import { Location } from "@angular/common";

@Component({
  selector: "app-vendor-upload",
  templateUrl: "./vendor-upload.component.html",
  styleUrls: ["./vendor-upload.component.css"]
})
export class VendorUploadComponent implements OnInit {
  vendor = new Vendor();
  currentUser: User;
  subscription: Subscription;
  dataLoading: boolean;
  errors = [];
  progressBarValue;

  @ViewChild("files") files_input;
  @ViewChild("formMultiple") multiple_form;
  @ViewChild("file") file_input;
  @ViewChild("form") my_form;
  @ViewChild("logoform") my_logoform;

  @Output() vendor_event = new EventEmitter();

  constructor(
    private _vendorService: VendorService,
    private _userService: UserService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    this.dataLoading = true;
    this.isLoggedIn();
    this.getVendor();
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

  getVendor() {
    this.subscription = this._activatedRoute.params.subscribe(params =>
      this._vendorService.showVendor(params.id, res => (this.vendor = res))
    );
  }

  uploadOne() {
    this.errors = [];
    if (this._userService.getCurrentUser() == null) {
      console.log("REPORTED: You do not have administration privilages");
      this._router.navigateByUrl("/");
    } else {
      let formData = new FormData(this.my_form.nativeElement);
      this._vendorService.post_to_s3(formData, this.vendor._id, res => {
        if (res.errors) {
          for (let key in res.errors) {
            let errors = res.errors[key];
            this.errors.push(errors.message);
          }
        } else {
          this.file_input.nativeElement.value = "";
          this.vendor_event.emit();
          location.reload();
        }
      });
    }
  }
  
  uploadLogo() {
    this.errors = [];
    if (this._userService.getCurrentUser() == null) {
      console.log("REPORTED: You do not have administration privilages");
      this._router.navigateByUrl("/");
    } else {
      let formData = new FormData(this.my_logoform.nativeElement);
      this._vendorService.post_logo_to_s3(formData, this.vendor._id, res => {
        if (res.errors) {
          for (let key in res.errors) {
            let errors = res.errors[key];
            this.errors.push(errors.message);
          }
        } else {
          this.file_input.nativeElement.value = "";
          this.vendor_event.emit();
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
      this._vendorService.post_multiple_to_s3(formData, this.vendor._id, vendor => {
          if (vendor.errors) {
            for (const key of Object.keys(vendor.errors)) {
              const errors = vendor.errors[key];
              this.errors.push(errors.message);
            }
          }
          this.file_input.nativeElement.value = "";
          this.vendor_event.emit();
          location.reload();
        });
    }
  }
  deleteImage() {
    this.errors = [];
    let r = window.confirm("Delete Image?");
    if (r == true) {
      this._vendorService.deleteImage(this.vendor._id, res => {
        if (res.errors) {
          for (const key of Object.keys(res.errors)) {
            const errors = res.errors[key];
            this.errors.push(errors.message);
          }
        } else {
          location.reload();
        }
      })
    } else {
      window.close();
    }
  }
  deleteLogo() {
    this.errors = [];
    let r = window.confirm("Delete Logo?");
    if (r == true) {
      this._vendorService.deleteLogo(this.vendor._id, res => {
        if (res.errors) {
          for (const key of Object.keys(res.errors)) {
            const errors = res.errors[key];
            this.errors.push(errors.message);
          }
        } else {
          location.reload();
        }
      })
    } else {
      window.close();
    }
  }

  deleteGalleryImage(i) {
    this.errors = [];
    let r = window.confirm("Delete Gallery Image?");
    if (r == true) {
      this.vendor.gallery.indexOf(Gallery);
      if (i !== -1) {
        this.vendor.gallery.splice(i, 1);
        this._vendorService.updateVendor(this.vendor, res => {
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
