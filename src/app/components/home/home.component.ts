import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { register } from 'swiper/element/bundle';

// Register Swiper custom elements
register();

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  ngOnInit() {
    // Initialize Swiper after a short delay to ensure DOM is ready
    setTimeout(() => {
      const swiperEl = document.querySelector('swiper-container');
      if (swiperEl) {
        const swiperParams = {
          slidesPerView: 1,
          spaceBetween: 30,
          loop: true,
          breakpoints: {
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          },
          pagination: {
            clickable: true,
          },
          navigation: true,
        };

        // Apply parameters
        Object.assign(swiperEl, swiperParams);

        // Initialize Swiper
        swiperEl.initialize();
      }
    }, 100);
  }
}
