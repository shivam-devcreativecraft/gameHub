import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService, Brand, Product } from '../../services/data.service';
import type { SwiperOptions } from 'swiper/types';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit, AfterViewInit {
  brands: Brand[] = [];
  brandProducts: { [key: string]: Product[] } = {};

  constructor(
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit() {
    this.dataService.getBrands().subscribe(brands => {
      this.brands = brands;
      // Load products for each brand
      this.brands.forEach(brand => {
        this.dataService.getProductsByBrand(brand.name).subscribe(products => {
          this.brandProducts[brand.name] = products;
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

  getBrandProducts(brandName: string): Product[] {
    return this.brandProducts[brandName] || [];
  }

  getPreviewProduct(brandName: string): Product | undefined {
    const products = this.brandProducts[brandName];
    return products ? products[0] : undefined;
  }

  getProductCount(brandName: string): number {
    return this.brandProducts[brandName]?.length || 0;
  }

  viewBrand(brand: Brand) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.router.navigate(['/brand', brand.name]);
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
          from: 'brand',
          returnTo: '/brands'
        }
      });
    }
  }
} 