import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatAnimacionComponent } from './chat-animacion.component';

describe('ChatAnimacionComponent', () => {
  let component: ChatAnimacionComponent;
  let fixture: ComponentFixture<ChatAnimacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatAnimacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatAnimacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
