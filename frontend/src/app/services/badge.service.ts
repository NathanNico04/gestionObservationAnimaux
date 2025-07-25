import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

interface Badge {
  id: number;
  nom: string;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class BadgeService {
  private server = environment.backendURL + '/api/badges';

  constructor(private http: HttpClient) {}

  public getUserBadges(): Observable<Badge[]> {
    return this.http
      .get<any>(this.server + '?user=current')
      .pipe(map((response) => response['hydra:member'] || []));
  }
}
