import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisUsuarioComponent } from './vis-usuario.component';

describe('VisUsuarioComponent', () => {
  let component: VisUsuarioComponent;
  let fixture: ComponentFixture<VisUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisUsuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VisUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
