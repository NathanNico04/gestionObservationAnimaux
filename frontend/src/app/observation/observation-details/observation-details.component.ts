import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { map, Observable, of, switchMap } from 'rxjs';

import { Observation } from '../../entity/observation';
import { AnimalService } from '../../services/animal.service';
import { ObservationService } from '../../services/observation.service';

@Component({
  selector: 'app-observation-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    AsyncPipe,
  ],
  templateUrl: './observation-details.component.html',
  styleUrls: ['./observation-details.component.scss'],
})
export class ObservationDetailsComponent {
  private route = inject(ActivatedRoute);
  private observationService = inject(ObservationService);
  private animalService = inject(AnimalService);

  id = Number(this.route.snapshot.paramMap.get('id'));

  observation$: Observable<Observation & { animalName?: string }> =
    this.observationService.get(this.id).pipe(
      switchMap((obs) => {
        if (typeof obs.animal === 'string') {
          const animalId = this.extractIdFromIri(obs.animal);
          return this.animalService.get(animalId).pipe(
            map((animal) => ({
              ...obs,
              animalName: animal.nomCommun,
            }))
          );
        }
        return of(obs);
      })
    );

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
