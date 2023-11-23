import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisPerfilComponent } from './vis-perfil.component';

describe('VisPerfilComponent', () => {
  let component: VisPerfilComponent;
  let fixture: ComponentFixture<VisPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisPerfilComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VisPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
