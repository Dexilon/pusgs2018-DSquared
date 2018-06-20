import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowVehiclesOfServiceComponent } from './show-vehicles-of-service.component';

describe('ShowVehiclesOfServiceComponent', () => {
  let component: ShowVehiclesOfServiceComponent;
  let fixture: ComponentFixture<ShowVehiclesOfServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowVehiclesOfServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowVehiclesOfServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
