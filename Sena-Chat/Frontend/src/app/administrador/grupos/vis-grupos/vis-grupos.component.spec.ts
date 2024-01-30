import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisGruposComponent } from './vis-grupos.component';

describe('VisGruposComponent', () => {
  let component: VisGruposComponent;
  let fixture: ComponentFixture<VisGruposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisGruposComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VisGruposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
