import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, HostListener, OnDestroy } from '@angular/core';
import { DataService, Product } from '../../services/data.service';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CompareComponent implements OnInit, OnDestroy {
  @ViewChild('searchInput1') searchInput1!: ElementRef;
  @ViewChild('searchInput2') searchInput2!: ElementRef;

  products$: Observable<Product[]>;
  allProducts: Product[] = [];
  selectedProduct1: Product | null = null;
  selectedProduct2: Product | null = null;
  searchQuery1: string = '';
  searchQuery2: string = '';
  searchResults1: Product[] = [];
  searchResults2: Product[] = [];
  isInput1Focused: boolean = false;
  isInput2Focused: boolean = false;
  
  private searchSubscription1?: Subscription;
  private searchSubscription2?: Subscription;

  comparisonFeatures = [
    'Brand',
    'Price',
    'Rating',
    'Connectivity',
    'Compatibility',
    'Features'
  ];

  constructor(private dataService: DataService) {
    this.products$ = this.dataService.getAllProducts();
  }

  ngOnInit(): void {
    // Load all products once
    this.dataService.getAllProducts().subscribe(products => {
      this.allProducts = products;
    });
  }

  ngOnDestroy(): void {
    if (this.searchSubscription1) {
      this.searchSubscription1.unsubscribe();
    }
    if (this.searchSubscription2) {
      this.searchSubscription2.unsubscribe();
    }
  }

  onInputFocus(searchBox: number): void {
    setTimeout(() => {
      if (searchBox === 1) {
        this.isInput1Focused = true;
        this.searchResults1 = [...this.allProducts];
        if (!this.searchSubscription1) {
          this.setupSearchListener(1);
        }
      } else {
        this.isInput2Focused = true;
        this.searchResults2 = [...this.allProducts];
        if (!this.searchSubscription2) {
          this.setupSearchListener(2);
        }
      }
    });
  }

  private setupSearchListener(searchBox: number): void {
    const searchInput = searchBox === 1 ? this.searchInput1 : this.searchInput2;
    const subscription = searchBox === 1 ? this.searchSubscription1 : this.searchSubscription2;

    if (subscription) {
      subscription.unsubscribe();
    }

    const input = searchInput.nativeElement;
    const newSubscription = new Subscription();
    
    // Handle input changes
    const inputHandler = () => {
      const searchTerm = input.value;
      if (searchTerm.length === 0) {
        // Show all products when search is empty
        if (searchBox === 1) {
          this.searchResults1 = [...this.allProducts];
        } else {
          this.searchResults2 = [...this.allProducts];
        }
      } else {
        this.performSearch(searchBox, searchTerm);
      }
    };

    // Add input event listener
    input.addEventListener('input', inputHandler);
    newSubscription.add(() => {
      input.removeEventListener('input', inputHandler);
    });

    if (searchBox === 1) {
      this.searchSubscription1 = newSubscription;
    } else {
      this.searchSubscription2 = newSubscription;
    }
  }

  private performSearch(searchBox: number, searchTerm: string): void {
    const filteredResults = this.allProducts.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 5); // Limit to 5 results

    if (searchBox === 1) {
      this.searchResults1 = filteredResults;
    } else {
      this.searchResults2 = filteredResults;
    }
  }

  clearSearch(searchBox: number): void {
    if (searchBox === 1) {
      this.searchQuery1 = '';
      this.searchResults1 = [...this.allProducts];
      this.searchInput1.nativeElement.focus();
    } else {
      this.searchQuery2 = '';
      this.searchResults2 = [...this.allProducts];
      this.searchInput2.nativeElement.focus();
    }
  }

  selectProduct(searchBox: number, product: Product): void {
    if (searchBox === 1) {
      this.selectedProduct1 = { ...product };
      this.searchQuery1 = product.name;
      this.searchResults1 = [];
      this.isInput1Focused = false;
    } else {
      this.selectedProduct2 = { ...product };
      this.searchQuery2 = product.name;
      this.searchResults2 = [];
      this.isInput2Focused = false;
    }
  }

  clearComparison(): void {
    this.selectedProduct1 = null;
    this.selectedProduct2 = null;
    this.searchQuery1 = '';
    this.searchQuery2 = '';
    this.searchResults1 = [];
    this.searchResults2 = [];
    this.isInput1Focused = false;
    this.isInput2Focused = false;
    
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getFeatureValue(product: Product, feature: string): string {
    if (!product) return 'N/A';
    
    switch (feature.toLowerCase()) {
      case 'brand':
        return product.brand;
      case 'price':
        return `₹${product.currentPrice}`;
      case 'rating':
        return `${product.rating} (${product.reviewCount} reviews)`;
      case 'connectivity':
        return product.connectivity || 'Not specified';
      case 'compatibility':
        return product.compatibility || 'Not specified';
      case 'features':
        return product.features?.join(', ') || 'None';
      default:
        return 'N/A';
    }
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    
    // Don't close if clicking on input or clear button
    if (target.matches('input') || target.matches('button') || target.matches('i.bi-x')) {
      return;
    }

    const searchContainer1 = document.querySelector('.search-container:first-of-type');
    const searchContainer2 = document.querySelector('.search-container:last-of-type');
    
    if (searchContainer1 && !searchContainer1.contains(target)) {
      this.isInput1Focused = false;
      if (!this.selectedProduct1) {
        this.searchResults1 = [];
        this.searchQuery1 = '';
      }
    }
    
    if (searchContainer2 && !searchContainer2.contains(target)) {
      this.isInput2Focused = false;
      if (!this.selectedProduct2) {
        this.searchResults2 = [];
        this.searchQuery2 = '';
      }
    }
  }
} 