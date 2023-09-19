import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisPerfilComponent } from './vis-perfil.component';

describe('VisPerfilComponent', () => {
  let component: VisPerfilComponent;
  let fixture: ComponentFixture<VisPerfilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisPerfilComponent]
    });
    fixture = TestBed.createComponent(VisPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
