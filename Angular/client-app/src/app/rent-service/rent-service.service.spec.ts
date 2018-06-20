import { TestBed, inject } from '@angular/core/testing';

import { RentServiceService } from './rent-service.service';

describe('RentServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RentServiceService]
    });
  });

  it('should be created', inject([RentServiceService], (service: RentServiceService) => {
    expect(service).toBeTruthy();
  }));
});
