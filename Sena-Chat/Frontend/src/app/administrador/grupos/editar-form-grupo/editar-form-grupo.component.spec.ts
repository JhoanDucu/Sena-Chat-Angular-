import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarFormGrupoComponent } from './editar-form-grupo.component';

describe('EditarFormGrupoComponent', () => {
  let component: EditarFormGrupoComponent;
  let fixture: ComponentFixture<EditarFormGrupoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarFormGrupoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarFormGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
