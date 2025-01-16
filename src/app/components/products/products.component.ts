import { Component, AfterViewInit, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  hoveredProduct: Product | null = null;
  
  // Pagination properties
  currentPage: number = 1;
  itemsPerPage: number = 8;
  totalItems: number = 0;
  pages: number[] = [];

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // Check for category or brand in URL parameters
    this.route.queryParams.subscribe(params => {
      if (params['category']) {
        this.selectedCategory = params['category'];
        this.filterByCategory(this.selectedCategory);
      } else if (params['brand']) {
        this.dataService.getProductsByBrand(params['brand']).subscribe(products => {
          this.products = products;
          this.totalItems = products.length;
          this.updatePagination();
        });
      } else {
        // Load all products if no category or brand specified
        this.dataService.getAllProducts().subscribe(products => {
          this.products = products;
          this.totalItems = products.length;
          this.updatePagination();
        });
      }
    });

    // Load categories
    this.dataService.getCategories().subscribe(categories => {
      this.categories = ['All', ...categories];
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

  filterByCategory(category: string) {
    this.selectedCategory = category;
    this.currentPage = 1; // Reset to first page when filtering
    if (category === 'All') {
      this.dataService.getAllProducts().subscribe(products => {
        this.products = products;
        this.totalItems = products.length;
        this.updatePagination();
      });
    } else {
      this.dataService.getProductsByCategory(category).subscribe(products => {
        this.products = products;
        this.totalItems = products.length;
        this.updatePagination();
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

  // Pagination methods
  updatePagination() {
    const totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this.pages = Array.from({length: totalPages}, (_, i) => i + 1);
  }

  setPage(page: number) {
    if (page >= 1 && page <= Math.ceil(this.totalItems / this.itemsPerPage)) {
      this.currentPage = page;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  getPaginatedProducts(): Product[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.products.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  getPageNumbers(): number[] {
    const totalPages = this.totalPages;
    const current = this.currentPage;
    const pages: number[] = [];
    
    if (totalPages <= 5) {
      return Array.from({length: totalPages}, (_, i) => i + 1);
    }
    
    if (current <= 3) {
      return [1, 2, 3, 4, 5];
    }
    
    if (current >= totalPages - 2) {
      return Array.from({length: 5}, (_, i) => totalPages - 4 + i);
    }
    
    return [current - 2, current - 1, current, current + 1, current + 2];
  }

  showPreview(product: Product) {
    this.hoveredProduct = product;
  }

  hidePreview() {
    this.hoveredProduct = null;
  }

  openProductDetails(product: Product) {
    // Navigate to preview with product ID and name
    if (typeof product.id === 'number') {
      // Convert product name to URL-friendly format
      const urlFriendlyName = product.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric chars with hyphens
        .replace(/(^-|-$)/g, ''); // Remove leading/trailing hyphens

      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.router.navigate(['/preview', product.id, urlFriendlyName]);
    } else {
      console.error('Invalid product ID:', product.id);
    }
  }
}
