import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajesEnviarComponent } from './mensajes-enviar.component';

describe('MensajesEnviarComponent', () => {
  let component: MensajesEnviarComponent;
  let fixture: ComponentFixture<MensajesEnviarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MensajesEnviarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MensajesEnviarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
