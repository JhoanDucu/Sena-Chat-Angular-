import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoFichasComponent } from './info-fichas.component';

describe('InfoFichasComponent', () => {
  let component: InfoFichasComponent;
  let fixture: ComponentFixture<InfoFichasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoFichasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoFichasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
