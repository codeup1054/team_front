import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})

export class CrudService {
  constructor(private _http: HttpClient) {}

  addItem(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/api/v1/data/', data);
  }

  updateItem(id: number, data: any): Observable<any> {
    console.log("@@ updateMember",data)
    return this._http.put(`http://localhost:3000/api/v1/data/${id}`, data);
  }

  getItemList(): Observable<any> {
    return this._http.get('http://localhost:3000/api/v1/data/');
  }

  deleteItem(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/api/v1/data/${id}`);
  }
}

import { Observable } from 'rxjs';
