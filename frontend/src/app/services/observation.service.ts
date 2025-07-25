import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiResponse } from '../entity/api-response';
import { Observation } from '../entity/observation';

@Injectable({
  providedIn: 'root',
})
export class ObservationService {
  private server = 'http://localhost:8082/api/observations';

  constructor(private http: HttpClient) {}

  private get authHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/ld+json',
      Authorization: token ? `Bearer ${token}` : '',
    });
  }

  private get patchHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/merge-patch+json',
      Authorization: token ? `Bearer ${token}` : '',
    });
  }

  public all(): Observable<Observation[]> {
    return this.http
      .get<ApiResponse<Observation>>(this.server, { headers: this.authHeaders })
      .pipe(map((res) => res.member));
  }

  public allByUser(userId: number): Observable<Observation[]> {
    return this.http
      .get<ApiResponse<Observation>>(this.server, {
        headers: this.authHeaders,
      })
      .pipe(map((res) => res.member));
  }

  public get(id: number): Observable<Observation> {
    return this.http.get<Observation>(`${this.server}/${id}`, {
      headers: this.authHeaders,
    });
  }

  public create(obs: Observation): Observable<boolean> {
    return this.http
      .post(this.server, obs, {
        headers: this.authHeaders,
        observe: 'response',
      })
      .pipe(map((res) => res.status === 201));
  }

  public update(obs: Observation): Observable<boolean> {
    return this.http
      .patch(`${this.server}/${obs.id}`, obs, {
        headers: this.patchHeaders,
        observe: 'response',
      })
      .pipe(map((res) => res.status === 200));
  }

  public delete(id: number): Observable<boolean> {
    return this.http
      .delete(`${this.server}/${id}`, {
        headers: this.authHeaders,
        observe: 'response',
      })
      .pipe(map((res) => res.status === 204));
  }
}
