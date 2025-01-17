import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService, Product } from '../../services/data.service';
import type { SwiperOptions } from 'swiper/types';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, AfterViewInit {
  categories: string[] = [];
  categoryProducts: { [key: string]: Product[] } = {};

  constructor(
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit() {
    this.dataService.getCategories().subscribe(categories => {
      this.categories = categories;
      // Load products for each category
      this.categories.forEach(category => {
        this.dataService.getProductsByCategory(category).subscribe(products => {
          this.categoryProducts[category] = products;
        });
      });
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      const swipers = document.querySelectorAll('swiper-container');
      swipers.forEach(swiper => {
        Object.assign(swiper, {
          slidesPerView: 1,
          spaceBetween: 0,
          autoplay: {
            delay: 2000,
            disableOnInteraction: false
          },
          loop: true,
          effect: 'fade',
          fadeEffect: {
            crossFade: true
          }
        });
        // @ts-ignore
        swiper.initialize();
        
        // Start autoplay after initialization
        setTimeout(() => {
          if (swiper.swiper && swiper.swiper.autoplay) {
            swiper.swiper.autoplay.start();
          }
        }, 100);
      });
    });
  }

  getCategoryProducts(category: string): Product[] {
    return this.categoryProducts[category] || [];
  }

  getPreviewProduct(category: string): Product | undefined {
    const products = this.categoryProducts[category];
    return products ? products[0] : undefined;
  }

  getProductCount(category: string): number {
    return this.categoryProducts[category]?.length || 0;
  }

  viewCategory(category: string) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.router.navigate(['/category', category]);
  }

  pauseSwiper(event: any) {
    const swiper = event.target;
    if (swiper && swiper.swiper && swiper.swiper.autoplay) {
      swiper.swiper.autoplay.stop();
    }
  }

  resumeSwiper(event: any) {
    const swiper = event.target;
    if (swiper && swiper.swiper && swiper.swiper.autoplay) {
      swiper.swiper.autoplay.start();
    }
  }

  openProductDetails(product: Product) {
    if (typeof product.id === 'number') {
      const urlFriendlyName = product.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.router.navigate(['/preview', product.id, urlFriendlyName], {
        state: { 
          from: 'category',
          returnTo: '/categories'
        }
      });
    }
  }
} 