import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService, Product, Brand } from '../../services/data.service';
import VanillaTilt from 'vanilla-tilt';

@Component({
  selector: 'app-brand-details',
  templateUrl: './brand-details.component.html',
  styleUrls: ['./brand-details.component.scss']
})
export class BrandDetailsComponent implements OnInit, AfterViewInit {
  brand?: Brand;
  products: Product[] = [];
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const brandName = params['name'];
      
      // Get brand details
      this.dataService.getBrands().subscribe(brands => {
        this.brand = brands.find(b => b.name === brandName);
        
        // Get products for this brand
        if (this.brand) {
          this.dataService.getProductsByBrand(this.brand.name).subscribe(products => {
            this.products = products;
            this.loading = false;
          });
        }
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
    this.router.navigate(['/brands']);
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
          returnTo: `/brand/${product.brand}`
        }
      });
    }
  }
}
