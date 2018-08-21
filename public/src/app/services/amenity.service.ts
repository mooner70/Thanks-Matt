import { MessageService } from './messages.service';
import { Injectable } from '@angular/core';
import { Amenity } from '../models/amenity';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class AmenityService {

  constructor(
    private _messageService: MessageService,
    private _http: Http
  ) { }

  getAmenities(callback) {
    this._http.get('/amenities').subscribe(
      res => callback(res.json()),
      err => console.error(err)
    );
  }


  createAmenity(newAmenity: Amenity, callback) {
    return this._http.post('/amenities', newAmenity).subscribe(
      res => {
        const amenity = res.json();
        callback(amenity);
      },
      err => console.log(err)
    );
  }

  destroy(id: string, callback) {
    this._http.delete(`amenities/${id}`).subscribe(
      res => callback(res.json()),
      err => console.log(err)
    );
  }

  showAmenity(id: string, callback) {
    this._http.get(`amenities/${id}`).subscribe(
      res => callback(res.json()),
      err => console.log(err)
    );
  }

  updateAmenity(newAmenity: Amenity, callback) {
    this._http.put(`amenities/${newAmenity._id}`, newAmenity).subscribe(
      res => callback(res.json()),
      err => console.log(err)
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
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
    this._messageService.add('AmenityService: ' + message);
  }

}
