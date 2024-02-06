import { TestBed } from '@angular/core/testing';

import { SonidosService } from './sonidos.service';

describe('SonidosService', () => {
  let service: SonidosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SonidosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
