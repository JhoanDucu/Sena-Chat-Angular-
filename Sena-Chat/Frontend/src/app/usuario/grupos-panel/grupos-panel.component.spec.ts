import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GruposPanelComponent } from './grupos-panel.component';

describe('GruposPanelComponent', () => {
  let component: GruposPanelComponent;
  let fixture: ComponentFixture<GruposPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GruposPanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GruposPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
