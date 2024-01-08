import { TestBed } from '@angular/core/testing';

import { VisPerfilService } from './vis-perfil.service';

describe('VisPerfilService', () => {
  let service: VisPerfilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisPerfilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
