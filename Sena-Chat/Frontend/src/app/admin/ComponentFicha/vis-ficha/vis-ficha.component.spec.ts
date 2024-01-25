import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisFichaComponent } from './vis-ficha.component';

describe('VisFichaComponent', () => {
  let component: VisFichaComponent;
  let fixture: ComponentFixture<VisFichaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisFichaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VisFichaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
