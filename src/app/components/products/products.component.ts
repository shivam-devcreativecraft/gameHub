import { Component, AfterViewInit, OnInit } from '@angular/core';
import VanillaTilt from 'vanilla-tilt';
import { DataService, Product } from '../../services/data.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, AfterViewInit {
  products: Product[] = [];
  categories: string[] = [];
  selectedCategory: string = 'All';

  constructor(private dataService: DataService) {}

  ngOnInit() {
    // Load products
    this.dataService.getAllProducts().subscribe(products => {
      this.products = products;
    });

    // Load categories
    this.dataService.getCategories().subscribe(categories => {
      this.categories = ['All', ...categories];
    });
  }

  ngAfterViewInit() {
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

  filterByCategory(category: string) {
    this.selectedCategory = category;
    if (category === 'All') {
      this.dataService.getAllProducts().subscribe(products => {
        this.products = products;
      });
    } else {
      this.dataService.getProductsByCategory(category).subscribe(products => {
        this.products = products;
      });
    }
  }

  sortProducts(sortBy: string) {
    switch (sortBy) {
      case 'price-low':
        this.products.sort((a, b) => a.currentPrice - b.currentPrice);
        break;
      case 'price-high':
        this.products.sort((a, b) => b.currentPrice - a.currentPrice);
        break;
      case 'rating':
        this.products.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Sort by ID (default/featured)
        this.products.sort((a, b) => a.id - b.id);
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

  onSortChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.sortProducts(value);
  }
}
