import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservationsListComponent } from './observations-list.component';

describe('ObservationsListComponent', () => {
  let component: ObservationsListComponent;
  let fixture: ComponentFixture<ObservationsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObservationsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObservationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
