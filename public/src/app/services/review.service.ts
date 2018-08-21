import { MessageService } from './messages.service';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import { catchError, map, tap } from 'rxjs/operators';
import { Review } from '../models/review';

@Injectable()
export class ReviewService {

  constructor(
    private _messageService: MessageService,
    private _http: Http
  ) { }

  getReviews(callback) {
    this._http.get('/reviews').subscribe(
      res => callback(res.json()),
      err => console.error(err)
    );
  }


  createReview(id: string, newReview: Review, callback) {
    return this._http.post(`reviews/${id}`, newReview).subscribe(res => {
        const review = res.json();
        callback(review);
      }, err => console.log(err));
  }

  destroyReview(id: string, callback) {
    this._http.delete(`reviews/${id}`).subscribe(
      res => callback(res.json()),
      err => console.log(err)
    );
  }

  showReview(id: string, callback) {
    this._http.get(`reviews/${id}`).subscribe(
      res => callback(res.json()),
      err => console.log(err)
    );
  }

  updateReview(newReview: Review, callback) {
    this._http.put(`reviews/${newReview._id}`, newReview).subscribe(
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
    this._messageService.add('ReviewService: ' + message);
  }

}
