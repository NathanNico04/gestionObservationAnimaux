import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

import { Animal } from '../../entity/animal';
import { AnimalService } from '../../services/animal.service';

@Component({
  selector: 'app-animal-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    AsyncPipe,
  ],
  templateUrl: './animal-detail.component.html',
  styleUrls: ['./animal-detail.component.scss'],
})
export class AnimalDetailsComponent {
  private route = inject(ActivatedRoute);
  private animalService = inject(AnimalService);

  id = Number(this.route.snapshot.paramMap.get('id'));
  animal$: Observable<Animal> = this.animalService.get(this.id);
}
