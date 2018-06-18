import { TestBed, inject } from '@angular/core/testing';

import { VehicleServiceService } from './vehicle-service.service';

describe('VehicleServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VehicleServiceService]
    });
  });

  it('should be created', inject([VehicleServiceService], (service: VehicleServiceService) => {
    expect(service).toBeTruthy();
  }));
});
