import { TestBed } from '@angular/core/testing';

import { LogearService } from './logear.service';

describe('LogearService', () => {
  let service: LogearService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogearService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
