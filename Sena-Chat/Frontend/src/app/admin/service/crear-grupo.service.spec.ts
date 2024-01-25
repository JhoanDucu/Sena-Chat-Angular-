import { TestBed } from '@angular/core/testing';

import { CrearGrupoService } from './crear-grupo.service';

describe('CrearGrupoService', () => {
  let service: CrearGrupoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrearGrupoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
