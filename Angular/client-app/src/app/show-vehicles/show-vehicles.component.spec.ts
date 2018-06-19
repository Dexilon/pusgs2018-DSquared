import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowVehiclesComponent } from './show-vehicles.component';

describe('ShowVehiclesComponent', () => {
  let component: ShowVehiclesComponent;
  let fixture: ComponentFixture<ShowVehiclesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowVehiclesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowVehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
