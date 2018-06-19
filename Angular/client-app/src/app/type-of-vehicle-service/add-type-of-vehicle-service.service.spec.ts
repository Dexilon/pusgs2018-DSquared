import { TestBed, inject } from '@angular/core/testing';

import { AddTypeOfVehicleServiceService } from './add-type-of-vehicle-service.service';

describe('AddTypeOfVehicleServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddTypeOfVehicleServiceService]
    });
  });

  it('should be created', inject([AddTypeOfVehicleServiceService], (service: AddTypeOfVehicleServiceService) => {
    expect(service).toBeTruthy();
  }));
});
