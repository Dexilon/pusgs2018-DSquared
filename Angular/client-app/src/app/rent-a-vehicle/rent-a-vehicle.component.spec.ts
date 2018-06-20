import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentAVehicleComponent } from './rent-a-vehicle.component';

describe('RentAVehicleComponent', () => {
  let component: RentAVehicleComponent;
  let fixture: ComponentFixture<RentAVehicleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentAVehicleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentAVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
