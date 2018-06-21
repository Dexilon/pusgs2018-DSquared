import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowUserRentsComponent } from './show-user-rents.component';

describe('ShowUserRentsComponent', () => {
  let component: ShowUserRentsComponent;
  let fixture: ComponentFixture<ShowUserRentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowUserRentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowUserRentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
