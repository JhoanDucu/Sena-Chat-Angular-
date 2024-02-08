import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoAgregarComponent } from './info-agregar.component';

describe('InfoAgregarComponent', () => {
  let component: InfoAgregarComponent;
  let fixture: ComponentFixture<InfoAgregarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoAgregarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoAgregarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
