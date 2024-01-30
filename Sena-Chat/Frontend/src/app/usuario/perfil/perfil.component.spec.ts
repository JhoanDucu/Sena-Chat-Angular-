import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<<< Updated upstream:Sena-Chat/Frontend/src/app/usuario/perfil/perfil.component.spec.ts
import { PerfilComponent } from './perfil.component';

describe('PerfilComponent', () => {
  let component: PerfilComponent;
  let fixture: ComponentFixture<PerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PerfilComponent);
========
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
>>>>>>>> Stashed changes:Sena-Chat/Frontend/src/app/usuario/grupo/grupo.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
