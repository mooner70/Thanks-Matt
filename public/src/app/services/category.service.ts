import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './messages.service';
import { Category } from '../models/category';


@Injectable()
export class CategoryService {

  constructor(
    private _messageService: MessageService,
    private _http: Http
  ) { }

  getCategories(callback) {
    this._http.get('/categories').subscribe(
      res => callback(res.json()),
      err => console.error(err)
    );
  }


  createCategory(newCategory: Category, callback) {
    return this._http.post('/categories', newCategory).subscribe(
      res => {
        const category = res.json();
        callback(category);
      },
      err => console.log(err)
    );
  }

  destroy(id: string, callback) {
    this._http.delete(`categories/${id}`).subscribe(
      res => callback(res.json()),
      err => console.log(err)
    );
  }

  showCategory(id: string, callback) {
    this._http.get(`categories/${id}`).subscribe(
      res => callback(res.json()),
      err => console.log(err)
    );
  }

  updateCategory(newCategory: Category, callback) {
    this._http.put(`categories/${newCategory._id}`, newCategory).subscribe(
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
    this._messageService.add('CategoryService: ' + message);
  }
}
