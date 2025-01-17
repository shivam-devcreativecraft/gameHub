import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../services/data.service';
import { DataService } from '../../services/data.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-product-preview',
  templateUrl: './product-preview.component.html',
  styleUrls: ['./product-preview.component.scss']
})
export class ProductPreviewComponent implements OnInit {
  product!: Product;
  loading: boolean = true;
  productName: string = '';
  navigationState: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private titleService: Title
  ) {
    // Store navigation state when component is created
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.navigationState = navigation.extras.state;
    }
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const productId = parseInt(params['id'], 10);
      this.productName = params['name'] || '';
      
      if (!isNaN(productId)) {
        this.loadProduct(productId);
      } else {
        this.handleError();
      }
    });
  }

  private loadProduct(id: number) {
    this.loading = true;
    this.dataService.getProductById(id).subscribe({
      next: (product) => {
        if (product) {
          this.product = product;
          this.loading = false;
          
          // Update the URL if the name doesn't match
          const urlFriendlyName = this.getUrlFriendlyName(product.name);
          if (this.productName !== urlFriendlyName) {
            this.router.navigate(['/preview', id, urlFriendlyName], { 
              replaceUrl: true // Replace current URL to avoid adding to history
            });
          }
          
          // Update page title
          this.titleService.setTitle(`${product.name} - Gaming Controllers`);
        } else {
          this.handleError();
        }
      },
      error: (error) => {
        console.error('Error loading product:', error);
        this.handleError();
      }
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

  calculateDiscount(originalPrice: number, currentPrice: number): number {
    const discount = ((originalPrice - currentPrice) / originalPrice) * 100;
    return Math.round(discount);
  }

  private getUrlFriendlyName(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  private handleError() {
    this.loading = false;
    this.router.navigate(['/products']);
  }

  formatPrice(price: number): string {
    return `₹${price.toLocaleString('en-IN')}`;
  }

  getBackButtonText(): string {
    if (this.navigationState?.from === 'brand') {
      return 'Back to Brands';
    } else if (this.navigationState?.from === 'category') {
      return 'Back to Categories';
    }
    return 'Back to Products';
  }

  goBack(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (this.navigationState?.returnTo) {
      // Navigate back to the listing page (brands or categories)
      this.router.navigate([this.navigationState.returnTo]);
    } else {
      // Default fallback to products
      this.router.navigate(['/products']);
    }
  }
} 