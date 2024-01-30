import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisMensajeComponent } from './vis-mensaje.component';

describe('VisMensajeComponent', () => {
  let component: VisMensajeComponent;
  let fixture: ComponentFixture<VisMensajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisMensajeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VisMensajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
