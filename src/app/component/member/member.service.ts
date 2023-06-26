import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class MemberService {
  constructor(private _http: HttpClient) {}

  addMember(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/api/v1/team/', data);
  }

  updateMember(id: number, data: any): Observable<any> {
    console.log("@@ updateMember",data)
    return this._http.put(`http://localhost:3000/api/v1/team/${id}`, data);
  }

  getMemberList(): Observable<any> {
    return this._http.get('http://localhost:3000/api/v1/team/');
  }

  deleteMember(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/api/v1/team/${id}`);
  }
}
