import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelect,
    MatOption,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(public auth: AuthService) {}

  registerForm = new FormGroup({
    username: new FormControl('', Validators.required),
    prenom: new FormControl('', Validators.required),
    nom: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    role: new FormControl('ROLE_USER', Validators.required),
  });

  submit() {
    console.log('submit called !');
    const value = this.registerForm.value;
    if (
      this.registerForm.valid &&
      value.username &&
      value.prenom && // <-- corrigé ici
      value.nom && // <-- corrigé ici
      value.password &&
      value.role
    ) {
      this.auth.register(
        value.username,
        value.password,
        value.prenom, // <-- corrigé ici
        value.nom, // <-- corrigé ici
        value.role
      );
    }
  }
}
