import { TestBed } from '@angular/core/testing';

import { ConfigurarService } from './configurar.service';

describe('ConfigurarService', () => {
  let service: ConfigurarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigurarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
