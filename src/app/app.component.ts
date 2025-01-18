import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScrollService } from './services/scroll.service';
declare var Swiper: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'gamingcontrollers';

  constructor(
    private router: Router,
    private scrollService: ScrollService
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.initializeSwiper();
    }, 100);
  }

  private initializeSwiper() {
    const guidelineSwiper = new Swiper('.guidelineSwiper', {
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      speed: 1000,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        type: 'bullets',
        bulletElement: 'span',
        bulletClass: 'swiper-pagination-bullet',
        bulletActiveClass: 'swiper-pagination-bullet-active',
        renderBullet: function (index: number, className: string) {
          return '<span class="' + className + '"></span>';
        },
      },
      loop: true,
      grabCursor: true,
      keyboard: {
        enabled: true,
      },
      observer: true,
      observeParents: true,
      on: {
        init: function(this: any) {
          if (this && this.pagination) {
            setTimeout(() => {
              this.pagination.render();
              this.pagination.update();
            }, 0);
          }
        },
        slideChangeTransitionStart: function(this: any) {
          if (this && this.slides && this.activeIndex !== undefined) {
            const activeSlide = this.slides[this.activeIndex];
            if (activeSlide) {
              const labels = activeSlide.querySelectorAll('.label-line');
              labels.forEach((label: Element, index: number) => {
                if (label instanceof HTMLElement) {
                  label.style.transitionDelay = `${index * 0.1}s`;
                }
              });
            }
          }
        }
      }
    });

    // Add event listener for slide change to handle label animations
    guidelineSwiper.on('slideChange', function() {
      const slides = document.querySelectorAll('.swiper-slide');
      slides.forEach(slide => {
        const labels = slide.querySelectorAll('.label-line');
        labels.forEach((label: Element) => {
          if (label instanceof HTMLElement) {
            label.style.opacity = '0';
            label.style.transform = 'translateY(10px)';
          }
        });
      });
    });
  }
}
