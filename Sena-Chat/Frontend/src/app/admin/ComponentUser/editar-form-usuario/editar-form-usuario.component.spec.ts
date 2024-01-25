import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarFormUsuarioComponent } from './editar-form-usuario.component';

describe('EditarFormUsuarioComponent', () => {
  let component: EditarFormUsuarioComponent;
  let fixture: ComponentFixture<EditarFormUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarFormUsuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarFormUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
