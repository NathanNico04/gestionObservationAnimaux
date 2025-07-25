import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

import { Animal } from '../../entity/animal';
import { AnimalService } from '../../services/animal.service';

@Component({
  selector: 'app-animals-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatListModule,
    MatButtonModule,
    AsyncPipe,
  ],
  templateUrl: './animals-list.component.html',
  styleUrls: ['./animals-list.component.scss'],
})
export class AnimalsListComponent {
  private animalService = inject(AnimalService);

  constructor(public auth: AuthService) {}
  animals$: Observable<Animal[]> = this.animalService.all();

  deleteAnimal(id: number) {
    this.animalService.delete(id).subscribe(() => {
      this.animals$ = this.animalService.all(); // Recharge après suppression
    });
  }
}
