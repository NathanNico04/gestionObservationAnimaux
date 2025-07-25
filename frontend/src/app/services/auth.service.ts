import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { environment } from '../../environments/environment';

interface Token {
  token: string;
  userid: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private server = environment.backendURL;
  private _token?: string = undefined;
  private _username?: string = undefined;
  private _userid?: number = undefined;
  private _prenom?: string = undefined;
  private _nom?: string = undefined;
  private _roles?: string[] = undefined;
  private _error = false;

  public reset_error() {
    this._error = false;
  }

  public get error() {
    return this._error;
  }

  public get isAuthentified(): boolean {
    return this._token !== undefined;
  }

  public get isAdmin(): boolean {
    return this._roles?.includes('ROLE_ADMIN') ?? false;
  }

  public get token(): string {
    return this._token ? this._token : '';
  }

  public get username(): string {
    return this._username ? this._username : '';
  }

  public get userid(): number {
    return this._userid ? this._userid : NaN;
  }

  public get prenom(): string {
    return this._prenom ?? '';
  }

  public get nom(): string {
    return this._nom ?? '';
  }

  constructor(private http: HttpClient, private router: Router) {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const userid = localStorage.getItem('userid');

    if (token && username && userid) {
      this._token = token;
      this._username = username;
      this._prenom = localStorage.getItem('prenom') || undefined;
      this._nom = localStorage.getItem('nom') || undefined;
      this._userid = Number(userid);
    }
  }

  public login(username: string, password: string): void {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http
      .post<Token>(
        this.server + '/api/login_check',
        { username, password },
        { headers }
      )
      .subscribe({
        next: (response: Token) => {
          if (response) {
            this._token = response.token;
            this._userid = response.userid;
            this._username = username;

            localStorage.setItem('token', this._token);
            localStorage.setItem('username', this._username);
            localStorage.setItem('userid', String(this._userid));

            //this.loadProfile(); // très bien ici
            this.router.navigate(['/animals']);
          } else {
            this._error = true;
          }
        },
        error: () => {
          this._error = true;
        },
      });
  }

  public register(
    username: string,
    password: string,
    prenom: string,
    nom: string,
    role: string
  ) {
    this.http
      .post(this.server + '/api/registration', {
        username,
        password,
        prenom,
        nom,
        role,
      })
      .pipe(tap(console.log))
      .subscribe({
        next: (response) => {
          if (response) {
            this._username = username;
            this._prenom = prenom;
            this._nom = nom;

            localStorage.setItem('username', username);
            localStorage.setItem('prenom', prenom);
            localStorage.setItem('nom', nom);
          } else {
            this._error = true;
          }
        },
        error: () => {
          this._error = true;
        },
      });
  }

  public logout(): void {
    this._token = undefined;
    this._username = undefined;
    this._userid = undefined;
    this._prenom = undefined;
    this._nom = undefined;
    this._error = false;

    // Vide complètement les données locales
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userid');
    localStorage.removeItem('prenom');
    localStorage.removeItem('nom');

    this.router.navigate(['/login']);
  }

  /* public loadProfile() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this._token}`,
    });

    this.http.get<any>(this.server + '/api/me', { headers }).subscribe({
      next: (user) => {
        this._username = user.username;
        this._prenom = user.prenom;
        this._nom = user.nom;
        this._userid = user.id;

        localStorage.setItem('username', this._username || '');
        localStorage.setItem('prenom', this._prenom || '');
        localStorage.setItem('nom', this._nom || '');
        localStorage.setItem('userid', String(this._userid));
      },
      error: () => {
        this.logout(); // Si erreur (par exemple token expiré) on déconnecte
      },
    });
  } */
}
