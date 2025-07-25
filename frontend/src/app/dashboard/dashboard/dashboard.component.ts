import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { map } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { BadgeService } from '../../services/badge.service';
import { ObservationService } from '../../services/observation.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, AsyncPipe, MatCardModule, MatListModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  private observationService = inject(ObservationService);
  private badgeService = inject(BadgeService);
  private authService = inject(AuthService);

  // ➔ On garde tout sous forme d'observables
  totalObservations$ = this.observationService
    .all()
    .pipe(map((observations) => observations.length));

  badges$ = this.badgeService.getUserBadges();
}
