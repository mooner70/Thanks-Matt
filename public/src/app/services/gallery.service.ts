import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class GalleryService {

  constructor(private _http: Http) { }

  getImages() {
    // return this._http.get(`venues/${id}/gallery`)
    return this._http.get('galleries')
      .map((response: Response) => response.json())
      .toPromise()
      .catch((err: any) => {
        console.log(err);
        return Promise.reject(err);
      });
  }

  //Delete Image
  deleteImage(id: String) {
    return this._http.delete(`venues/${id}`)
      .map((response: Response) => response.json())
      .toPromise()
      .catch((err: any) => {
        console.log(err);
        return Promise.reject(err);
      });
  }

  //DeleteMultiple
  deleteMultiple(idList: string[]) {
    console.log('In delete service' + idList)
    var body = JSON.stringify(idList);
    const header = new Headers({ 'Content-Type': 'application/json' });
    return this._http.post('deleteMultiple', body, { headers: header })
      .map((response: Response) => response.json())
      .toPromise()
      .catch((err: any) => {
        console.log(err);
        return Promise.reject(err);
      });
  }
}
