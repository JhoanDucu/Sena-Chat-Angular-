import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiComponent } from './confi.component';

describe('ConfiComponent', () => {
  let component: ConfiComponent;
  let fixture: ComponentFixture<ConfiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfiComponent]
    });
    fixture = TestBed.createComponent(ConfiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
