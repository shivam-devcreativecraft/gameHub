import { Component, HostListener } from '@angular/core';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-scroll-top',
  template: `
    <button 
      class="scroll-top-btn" 
      [class.show]="isVisible" 
      (click)="scrollToTop()"
      aria-label="Scroll to top">
      <i class="bi bi-arrow-up-short"></i>
    </button>
  `,
  styles: [`
    .scroll-top-btn {
      position: fixed;
      bottom: 40px;
      right: 40px;
      width: 35px;
      height: 35px;
      border-radius: 8px;
      background: var(--primary);
      color: #ffffff;
      border: none;
      cursor: pointer;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      font-size: 1.3rem;
      backdrop-filter: blur(4px);
    }

    .scroll-top-btn:hover {
      background: color-mix(in srgb, var(--primary) 90%, white);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }

    .scroll-top-btn:active {
      transform: translateY(0);
    }

    .scroll-top-btn.show {
      opacity: 0.9;
      visibility: visible;
    }

    .scroll-top-btn i {
      transition: transform 0.2s ease;
      line-height: 1;
    }

    .scroll-top-btn:hover i {
      transform: translateY(-1px);
    }
  `]
})
export class ScrollTopComponent {
  isVisible = false;

  constructor(private scrollService: ScrollService) {}

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isVisible = window.scrollY > 300;
  }

  scrollToTop(): void {
    this.scrollService.scrollToTop();
  }
} 