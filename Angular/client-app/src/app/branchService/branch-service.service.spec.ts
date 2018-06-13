import { TestBed, inject } from '@angular/core/testing';

import { BranchServiceService } from './branch-service.service';

describe('BranchServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BranchServiceService]
    });
  });

  it('should be created', inject([BranchServiceService], (service: BranchServiceService) => {
    expect(service).toBeTruthy();
  }));
});
