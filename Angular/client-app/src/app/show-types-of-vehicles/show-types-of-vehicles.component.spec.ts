import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTypesOfVehiclesComponent } from './show-types-of-vehicles.component';

describe('ShowTypesOfVehiclesComponent', () => {
  let component: ShowTypesOfVehiclesComponent;
  let fixture: ComponentFixture<ShowTypesOfVehiclesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowTypesOfVehiclesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowTypesOfVehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
