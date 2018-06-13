import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowServicesComponent } from './show-services.component';

describe('ShowServicesComponent', () => {
  let component: ShowServicesComponent;
  let fixture: ComponentFixture<ShowServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
