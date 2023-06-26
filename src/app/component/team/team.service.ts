import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class TeamService {
  constructor(private _http: HttpClient) {}

  addTeam(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/api/v1/team/', data);
  }

  updateTeam(id: number, data: any): Observable<any> {
    console.log("@@ updateTeam",data)
    return this._http.put(`http://localhost:3000/api/v1/team/${id}`, data);
  }

  getTeamList(): Observable<any> {
    return this._http.get('http://localhost:3000/api/v1/team/');
  }

  deleteTeam(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/api/v1/team/${id}`);
  }
}

