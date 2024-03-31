import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarFormMensajeComponent } from './editar-form-mensaje.component';

describe('EditarFormMensajeComponent', () => {
  let component: EditarFormMensajeComponent;
  let fixture: ComponentFixture<EditarFormMensajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarFormMensajeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarFormMensajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
