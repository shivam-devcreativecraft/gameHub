import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService, Product } from '../../services/data.service';
import VanillaTilt from 'vanilla-tilt';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss']
})
export class CategoryDetailsComponent implements OnInit, AfterViewInit {
  categoryName: string = '';
  products: Product[] = [];
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.categoryName = params['name'];
      
      // Get products for this category
      this.dataService.getProductsByCategory(this.categoryName).subscribe(products => {
        this.products = products;
        this.loading = false;
      });
    });
  }

  ngAfterViewInit() {
    this.initTilt();
  }

  private initTilt() {
    // Initialize Vanilla-Tilt on product images
    const tiltElements = Array.from(document.querySelectorAll('.product-image img')) as HTMLElement[];
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

  goBack(): void {
    this.router.navigate(['/categories']);
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
          returnTo: `/category/${product.category}`
        }
      });
    }
  }
}
