import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AnimalDetailsComponent } from './animal/animal-detail/animal-detail.component'; // Ajoute cette ligne
import { AnimalFormComponent } from './animal/animal-form/animal-form.component';
import { AnimalsListComponent } from './animal/animals-list/animals-list.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ObservationDetailsComponent } from './observation/observation-details/observation-details.component';
import { ObservationFormComponent } from './observation/observation-form/observation-form.component';
import { ObservationsListComponent } from './observation/observations-list/observations-list.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'animals', component: AnimalsListComponent },
  { path: 'animals/:id', component: AnimalDetailsComponent },
  { path: 'add-animal', component: AnimalFormComponent },
  { path: 'edit-animal/:id', component: AnimalFormComponent },
  { path: 'observations', component: ObservationsListComponent },
  { path: 'observations/:id', component: ObservationDetailsComponent },
  { path: 'add-observation', component: ObservationFormComponent },
  { path: 'edit-observation/:id', component: ObservationFormComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
];
