import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarFormFichaComponent } from './editar-form-ficha.component';

describe('EditarFormFichaComponent', () => {
  let component: EditarFormFichaComponent;
  let fixture: ComponentFixture<EditarFormFichaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarFormFichaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarFormFichaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
