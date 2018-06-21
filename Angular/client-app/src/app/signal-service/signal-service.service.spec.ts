import { TestBed, inject } from '@angular/core/testing';

import { SignalServiceService } from './signal-service.service';

describe('SignalServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SignalServiceService]
    });
  });

  it('should be created', inject([SignalServiceService], (service: SignalServiceService) => {
    expect(service).toBeTruthy();
  }));
});
