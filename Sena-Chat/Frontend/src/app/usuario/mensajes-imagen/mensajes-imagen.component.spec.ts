import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajesImagenComponent } from './mensajes-imagen.component';

describe('MensajesImagenComponent', () => {
  let component: MensajesImagenComponent;
  let fixture: ComponentFixture<MensajesImagenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MensajesImagenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MensajesImagenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
