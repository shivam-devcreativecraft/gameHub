import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { register } from 'swiper/element/bundle';
import VanillaTilt from 'vanilla-tilt';

// Register Swiper custom elements
register();

interface Brand {
  name: string;
  shortName?: string;
  icon?: string;
}

interface Product {
  id: number;
  name: string;
  brand: string;
  badge: string;
  image: string;
  description: string;
  rating: number;
  reviewCount: number;
  currentPrice: number;
  originalPrice: number;
  amazonLink: string;
}

interface Statistic {
  value: string;
  label: string;
}

interface Feature {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit, AfterViewInit {
  brands: Brand[] = [
    { name: 'Xbox', icon: 'bi bi-xbox' },
    { name: 'PS', icon: 'bi bi-playstation' },
    { name: 'Cosmic Byte', shortName: 'CB' },
    { name: 'Redgear', shortName: 'RG' }
  ];

  statistics: Statistic[] = [
    { value: '200+', label: 'Controllers Compared' },
    { value: '20K+', label: 'Happy Gamers' },
    { value: '4.5+', label: 'Average Rating' }
  ];

  features: Feature[] = [
    {
      icon: 'bi bi-patch-check',
      title: 'Expert Reviews',
      description: 'In-depth analysis across all price ranges and brands'
    },
    {
      icon: 'bi bi-graph-up',
      title: 'Price Tracking',
      description: 'Real-time price comparisons for best value'
    },
    {
      icon: 'bi bi-people',
      title: 'Community Tested',
      description: 'Real feedback from Indian gamers'
    },
    {
      icon: 'bi bi-shield-check',
      title: 'Trusted Links',
      description: 'Direct links to authorized Indian sellers'
    }
  ];

  allProducts: Product[] = [
    {
      id: 1,
      name: 'Xbox Elite Controller',
      brand: 'Xbox',
      badge: 'Premium Pick',
      image: 'assets/swiper/swiper1.png',
      description: 'Professional gaming controller with customizable buttons',
      rating: 4.5,
      reviewCount: 2500,
      currentPrice: 18999,
      originalPrice: 19999,
      amazonLink: '#'
    },
    {
      id: 2,
      name: 'Cosmic Byte C3070W',
      brand: 'Cosmic Byte',
      badge: 'Best Value',
      image: 'assets/swiper/swiper2.png',
      description: 'Wireless controller with excellent build quality',
      rating: 4.0,
      reviewCount: 1800,
      currentPrice: 1999,
      originalPrice: 2499,
      amazonLink: '#'
    },
    {
      id: 3,
      name: 'Redgear Pro Wireless',
      brand: 'Redgear',
      badge: 'Budget Pick',
      image: 'assets/swiper/swiper3.png',
      description: 'Best budget wireless gaming controller',
      rating: 4.5,
      reviewCount: 3200,
      currentPrice: 1499,
      originalPrice: 1799,
      amazonLink: '#'
    }
  ];

  ngOnInit() {
    // Duplicate products for infinite loop
    this.allProducts = [...this.allProducts, ...this.allProducts];

    // Initialize Swiper after a short delay to ensure DOM is ready
    setTimeout(() => {
      const swiperEl = document.querySelector('swiper-container');
      if (swiperEl) {
        const swiperParams = {
          slidesPerView: 1,
          spaceBetween: 30,
          loop: true,
          loopedSlides: 3,
          autoplay: {
            delay: 3000,
            disableOnInteraction: false
          },
          pagination: {
            clickable: true,
            type: 'bullets',
          },
          navigation: true,
          breakpoints: {
            768: {
              slidesPerView: 2,
              spaceBetween: 30
            },
            1200: {
              slidesPerView: 3,
              spaceBetween: 30
            }
          }
        };

        // Apply parameters
        Object.assign(swiperEl, swiperParams);

        // Initialize Swiper
        swiperEl.initialize();
      }
    }, 100);
  }

  ngAfterViewInit() {
    // Initialize Vanilla-Tilt
    const tiltElements = Array.from(document.querySelectorAll('.product-image')) as HTMLElement[];
    VanillaTilt.init(tiltElements, {
      max: 15,
      speed: 400,
      glare: true,
      'max-glare': 0.3,
      scale: 1.1,
      perspective: 1000,
      transition: true,
      gyroscope: true
    });
  }

  getStars(rating: number): number[] {
    const stars: number[] = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(1);
    }

    // Add half star if needed
    if (hasHalfStar) {
      stars.push(0.5);
    }

    // Add empty stars
    while (stars.length < 5) {
      stars.push(0);
    }

    return stars;
  }

  formatPrice(price: number): string {
    return `₹${price.toLocaleString('en-IN')}`;
  }
}
