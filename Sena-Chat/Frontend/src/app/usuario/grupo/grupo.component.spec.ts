import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<<< Updated upstream:Sena-Chat/Frontend/src/app/usuario/grupo/grupo.component.spec.ts
import { GrupoComponent } from './grupo.component';

describe('GrupoComponent', () => {
  let component: GrupoComponent;
  let fixture: ComponentFixture<GrupoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrupoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GrupoComponent);
========
import { BuscadorComponent } from './buscador.component';

describe('BuscadorComponent', () => {
  let component: BuscadorComponent;
  let fixture: ComponentFixture<BuscadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscadorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuscadorComponent);
>>>>>>>> Stashed changes:Sena-Chat/Frontend/src/app/usuario/buscador/buscador.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
