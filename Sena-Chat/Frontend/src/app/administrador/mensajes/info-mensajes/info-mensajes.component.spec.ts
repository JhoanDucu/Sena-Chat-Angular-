import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoMensajesComponent } from './info-mensajes.component';

describe('InfoMensajesComponent', () => {
  let component: InfoMensajesComponent;
  let fixture: ComponentFixture<InfoMensajesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoMensajesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoMensajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
