import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Animal } from '../entity/animal';
import { ApiResponse } from '../entity/api-response';

@Injectable({
  providedIn: 'root',
})
export class AnimalService {
  private server = 'http://localhost:8082/api/animals';
  private headers = new HttpHeaders({ 'Content-Type': 'application/ld+json' });
  private patch_headers = new HttpHeaders({
    'Content-Type': 'application/merge-patch+json',
  });

  constructor(private http: HttpClient) {}

  public all(): Observable<Animal[]> {
    return this.http
      .get<ApiResponse<Animal>>(this.server)
      .pipe(map((res) => res.member));
  }

  public get(id: number): Observable<Animal> {
    return this.http.get<Animal>(`${this.server}/${id}`, {
      headers: this.headers,
    });
  }

  public create(animal: Animal): Observable<boolean> {
    return this.http
      .post(this.server, animal, { headers: this.headers, observe: 'response' })
      .pipe(map((res) => res.status === 201));
  }

  public update(animal: Animal): Observable<boolean> {
    return this.http
      .patch(`${this.server}/${animal.id}`, animal, {
        headers: this.patch_headers,
        observe: 'response',
      })
      .pipe(map((res) => res.status === 200));
  }

  public delete(id: number): Observable<boolean> {
    return this.http
      .delete(`${this.server}/${id}`, { observe: 'response' })
      .pipe(map((res) => res.status === 204));
  }
}
