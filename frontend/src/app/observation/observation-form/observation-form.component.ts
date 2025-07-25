import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Animal } from '../../entity/animal';
import { AnimalService } from '../../services/animal.service';
import { AuthService } from '../../services/auth.service';
import { ObservationService } from '../../services/observation.service';

@Component({
  selector: 'app-observation-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    AsyncPipe,
  ],
  templateUrl: './observation-form.component.html',
  styleUrls: ['./observation-form.component.scss'],
})
export class ObservationFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private observationService = inject(ObservationService);
  private router = inject(Router);
  private authService = inject(AuthService);
  private animalService = inject(AnimalService);

  id = Number(this.route.snapshot.paramMap.get('id'));
  isEditing = this.id > 0;
  animals$: Observable<Animal[]> | undefined;

  form: FormGroup = this.fb.group({
    date: ['', Validators.required],
    latitude: ['', Validators.required],
    longitude: ['', Validators.required],
    description: [''],
    animal: [null, Validators.required],
  });

  constructor() {
    if (this.isEditing) {
      this.observationService.get(this.id).subscribe((obs) => {
        const animalId =
          typeof obs.animal === 'string'
            ? Number(obs.animal.split('/').pop())
            : obs.animal?.id;
        this.form.patchValue({
          ...obs,
          animal: animalId,
        });
      });
    }
  }

  ngOnInit(): void {
    this.animals$ = this.animalService.all();
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formData = this.form.value;
      const userId = this.authService.userid;
  
      if (!userId) {
        console.error('Utilisateur pas connecté');
        return;
      }
  
      const observationPayload = {
        date: formData.date,
        latitude: +formData.latitude,
        longitude: +formData.longitude,
        description: formData.description,
        animal: `/api/animals/${formData.animal}`, 
      };      
  
      console.log('Observation:', observationPayload);
  
      const operation = this.isEditing
        ? this.observationService.update(observationPayload as any)
        : this.observationService.create(observationPayload as any);
  
      operation.subscribe({
        next: (success) => {
          if (success) {
            this.router.navigate(['/observations']);
          } else {
            console.error('Operation non aboutie');
          }
        },
        error: (err) => {
          console.error('Erreur:', err);
        },
      });
    }
  }
}  