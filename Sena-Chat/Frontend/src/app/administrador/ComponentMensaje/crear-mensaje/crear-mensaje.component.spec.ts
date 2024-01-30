import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GruposTituloComponent } from './grupos-titulo.component';

describe('GruposTituloComponent', () => {
  let component: GruposTituloComponent;
  let fixture: ComponentFixture<GruposTituloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GruposTituloComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GruposTituloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
