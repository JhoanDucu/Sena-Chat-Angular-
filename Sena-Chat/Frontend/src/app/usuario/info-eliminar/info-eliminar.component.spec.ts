import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoEliminarComponent } from './info-eliminar.component';

describe('InfoEliminarComponent', () => {
  let component: InfoEliminarComponent;
  let fixture: ComponentFixture<InfoEliminarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoEliminarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoEliminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
