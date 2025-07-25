import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { AuthService } from '../../services/auth.service';

import { Observation } from '../../entity/observation';
import { AnimalService } from '../../services/animal.service';
import { ObservationService } from '../../services/observation.service';

@Component({
  selector: 'app-observations-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatListModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    AsyncPipe,
  ],
  templateUrl: './observations-list.component.html',
  styleUrls: ['./observations-list.component.scss'],
})
export class ObservationsListComponent {
  private observationService = inject(ObservationService);
  private animalService = inject(AnimalService);

  observations$!: Observable<(Observation & { animalName?: string })[]>;

  constructor(public auth: AuthService) {
    if (this.auth.userid) {
      this.observations$ = this.observationService
        .allByUser(this.auth.userid)
        .pipe(
          switchMap((observations) => {
            const obsWithNames$ = observations.map((obs) => {
              if (typeof obs.animal === 'string') {
                const id = this.extractIdFromIri(obs.animal);
                return this.animalService
                  .get(id)
                  .pipe(
                    map((animal) => ({ ...obs, animalName: animal.nomCommun }))
                  );
              }
              return of(obs);
            });
            return forkJoin(obsWithNames$);
          })
        );
    } else {
      this.observations$ = of([]);
    }
  }

  deleteObservation(id: number) {
    this.observationService.delete(id).subscribe(() => {
      // Recharge la liste filtrée après suppression
      if (this.auth.userid) {
        this.observations$ = this.observationService
          .allByUser(this.auth.userid)
          .pipe(
            switchMap((observations) => {
              const obsWithNames$ = observations.map((obs) => {
                if (typeof obs.animal === 'string') {
                  const id = this.extractIdFromIri(obs.animal);
                  return this.animalService.get(id).pipe(
                    map((animal) => ({
                      ...obs,
                      animalName: animal.nomCommun,
                    }))
                  );
                }
                return of(obs);
              });
              return forkJoin(obsWithNames$);
            })
          );
      }
    });
  }

  extractIdFromIri(iri: string): number {
    return Number(iri.split('/').pop());
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }
}
