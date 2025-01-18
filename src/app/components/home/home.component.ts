import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { register } from 'swiper/element/bundle';
import VanillaTilt from 'vanilla-tilt';
import { DataService, Brand, Product, Statistic, Feature, Testimonial, FAQ, ComparisonFeature } from '../../services/data.service';

// Register Swiper custom elements
register();

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit, AfterViewInit {
  brands: Brand[] = [];
  statistics: Statistic[] = [];
  features: Feature[] = [];
  allProducts: Product[] = [];
  testimonials: Testimonial[] = [];
  faqs: FAQ[] = [];
  filteredFaqs: FAQ[] = [];
  faqSearchQuery: string = '';
  comparisonFeatures: ComparisonFeature[] = [];
  popularCategories: any[] = [];

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit() {
    // Fetch data from service
    this.dataService.getBrands().subscribe(brands => this.brands = brands.slice(0, 3));
    
    this.dataService.getStatistics().subscribe(stats => this.statistics = stats);
    this.dataService.getFeatures().subscribe(features => this.features = features);
    this.dataService.getTestimonials().subscribe(testimonials => {
      this.testimonials = testimonials;
    });
    this.dataService.getFAQs().subscribe(faqs => {
      this.faqs = faqs;
      this.filteredFaqs = faqs;
    });
    this.dataService.getComparisonFeatures().subscribe(features => this.comparisonFeatures = features);

    // Fetch premium products
    this.dataService.getAllProducts().subscribe(products => {
      this.allProducts = products.filter(product => 
        product.badge === 'Premium' || product.badge === 'Premium Budget'
      );
    });

    // Fetch categories
    this.dataService.getCategories().subscribe(categories => {
      this.popularCategories = categories.slice(0, 3)
        .map(category => ({
          name: this.dataService.formatCategoryName(category),
          description: this.dataService.getCategoryDescription(category),
          icon: this.dataService.getCategoryIcon(category),
          categoryId: category
        }));
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      const swipers = document.querySelectorAll('swiper-container');
      swipers.forEach(swiper => {
        const isTestimonialSwiper = swiper.closest('#testimonials') !== null;
        const isProductSwiper = swiper.closest('#products') !== null;

        let swiperConfig = {
          slidesPerView: 1,
          spaceBetween: 30,
          autoplay: {
            delay: isTestimonialSwiper ? 5000 : 3000,
            disableOnInteraction: false
          },
          loop: true,
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

        Object.assign(swiper, swiperConfig);
        // @ts-ignore
        swiper.initialize();
        
        // Start autoplay after initialization
        setTimeout(() => {
          if (swiper.swiper && swiper.swiper.autoplay) {
            swiper.swiper.autoplay.start();
          }
        }, 100);
      });

      // Initialize Vanilla Tilt on product images
      const productImages = Array.from(document.querySelectorAll('.product-image')) as HTMLElement[];
      VanillaTilt.init(productImages, {
        max: 25,
        speed: 400,
        scale: 1.1
      });
    });
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

  openProductPreview(product: any): void {
    const urlFriendlyName = product.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
      
    this.router.navigate(['/preview', product.id, urlFriendlyName], {
      state: { from: 'home' }
    });
  }

  viewCategory(categoryId: string): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.router.navigate(['/category', categoryId]);
  }

  filterFAQs() {
    if (!this.faqSearchQuery.trim()) {
      this.filteredFaqs = this.faqs;
      return;
    }

    const query = this.faqSearchQuery.toLowerCase().trim();
    this.filteredFaqs = this.faqs.filter(faq => 
      faq.question.toLowerCase().includes(query) || 
      faq.answer.toLowerCase().includes(query)
    );
  }

  navigateToCompare(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.router.navigate(['/compare']);
  }
}
