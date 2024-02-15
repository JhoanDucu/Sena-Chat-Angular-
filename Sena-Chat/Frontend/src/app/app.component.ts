import { Component, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit() {
    // this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '';
  }
}
