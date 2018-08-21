import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { tap, map, catchError } from "rxjs/operators";
import { MessageService } from "./messages.service";
import { Vendor } from "../models/vendor";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";


const API_URL = "/vendors/";


@Injectable()
export class VendorService {
  constructor(private _messageService: MessageService, private _http: Http) {}

  getVendors(callback) {
    this._http
      .get(API_URL)
      .subscribe(res => callback(res.json()), err => console.error(err));
  }
  
  getVendorsInOrder(callback) {
    this._http
      .get("/vendorsInOrder")
      .subscribe(res => callback(res.json()), err => console.error(err));
  }

  getSingleVendor(_category: string, callback) {
    var URL = API_URL + "category/" + _category;
    return this._http.get(URL, _category).subscribe(
      res => {
        callback(res.json());
      },
      err => console.log(err)
    );
  }

  createVendor(newVendor: Vendor, callback) {
    return this._http.post(API_URL, newVendor).subscribe(
      res => {
        const vendor = res.json();
        callback(vendor);
      },
      err => console.log(err)
    );
  }

  post_to_s3(formData, id: string, callback) {
    var URL = API_URL + "upload" + "/" + id;
    return this._http.put(URL, formData).subscribe(
      res => {
        // const vendor = res.json();
        callback(res.json());
      },
      err => console.log(err)
    );
  }

  post_logo_to_s3(formData, id: string, callback) {
    var URL = API_URL + "uploadLogo" + "/" + id;
    return this._http.put(URL, formData).subscribe(
      res => {
        // const vendor = res.json();
        callback(res.json());
      },
      err => console.log(err)
    );
  }

  post_multiple_to_s3(formData, id: string, callback) {
    var URL = API_URL + "upload" + "/" + "multiple" + "/" + id;
    return this._http.post(URL, formData).subscribe(
      res => {
        // const vendor = res.json();
        callback(res.json());
      },
      err => console.log(err)
    );
  }

  deleteImage(id: string, callback) {
    var URL = API_URL + "deleteImage" + "/" + id;
    return this._http.delete(URL, id).subscribe(
      res => {
        callback(res.json());
      },
      err => console.log(err)
    );
  }

  deleteLogo(id: string, callback) {
    var URL = API_URL + "deleteLogo" + "/" + id;
    return this._http.delete(URL, id).subscribe(
      res => {
        callback(res.json());
      },
      err => console.log(err)
    );
  }

  deleteGalleryImage(id: string, i, callback) {
    var URL = API_URL + "deleteGalleryImage" + "/" + id;
    return this._http.delete(URL, id).subscribe(
      res => {
        callback(res.json());
      },
      err => console.log(err)
    );
  }

  destroy(id: string, callback) {
    var URL = API_URL + id;
    this._http
      .delete(URL)
      .subscribe(res => callback(res.json()), err => console.log(err));
  }

  showVendor(id: string, callback) {
    var URL = API_URL + id;
    this._http
      .get(URL)
      .subscribe(res => callback(res.json()), err => console.log(err));
  }

  updateVendor(newVendor: Vendor, callback) {
    var URL = API_URL + newVendor._id;
    this._http
      .put(URL, newVendor)
      .subscribe(res => callback(res.json()), err => console.log(err));
  }

  getImages(id: string, callback) {
    var URL = API_URL + "images/" + id;
    return this._http.get(URL).subscribe(
      res => {
        callback(res.json());
      },
      err => console.log(err)
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a UserService message with the MessageService */
  private log(message: string) {
    this._messageService.add("VendorService: " + message);
  }
}
