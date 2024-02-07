import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajesVariosComponent } from './mensajes-varios.component';

describe('MensajesVariosComponent', () => {
  let component: MensajesVariosComponent;
  let fixture: ComponentFixture<MensajesVariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MensajesVariosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MensajesVariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
